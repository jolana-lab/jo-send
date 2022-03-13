import { Test, TestingModule } from '@nestjs/testing';
import { SlackCommandDto } from './dto/slack-command.dto';
import { SlackService } from './slack.service';

describe('SlackService', () => {
  let service: SlackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackService],
    }).compile();

    service = module.get<SlackService>(SlackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should parse body for sending SOL', () => {
    it('should validate the sender', () => {
      const payload: SlackCommandDto = {
        user_name: '',
        text: '@username 1',
      };
      try {
        service.sendSol(payload);
      } catch (e) {
        expect(e.message).toEqual('SOL sender is required.');
      }
    });

    it('should validate the payload text', () => {
      const payload: SlackCommandDto = {
        user_name: 'username',
        text: '@username 1 extra stuff',
      };
      try {
        service.sendSol(payload);
      } catch (e) {
        expect(e.message).toEqual(
          'Invalid format. Please use `@user <sol-amount>`',
        );
      }
    });

    it('should validate the receiver format', () => {
      const payload: SlackCommandDto = {
        user_name: 'username',
        text: 'username 1',
      };
      try {
        service.sendSol(payload);
      } catch (e) {
        expect(e.message).toEqual(
          'Invalid receiver format. Please make sure `@` in front of the username.',
        );
      }
    });

    it('should validate the sol amount', () => {
      const payload: SlackCommandDto = {
        user_name: 'username',
        text: '@username rich',
      };
      try {
        service.sendSol(payload);
      } catch (e) {
        expect(e.message).toEqual('Invalid SOL amount. It should be a number.');
      }
    });

    it('success', () => {
      const fromUsername = 'fromUsername';
      const toUsername = 'toUsername';
      const sol = 1;
      const payload: SlackCommandDto = {
        user_name: `${fromUsername}`,
        text: `@${toUsername} ${sol}`,
      };
      const expectedResult = {
        fromUsername,
        toUsername,
        sol,
      };
      const result = service.sendSol(payload);
      expect(result).toEqual(expectedResult);
    });
  });
});
