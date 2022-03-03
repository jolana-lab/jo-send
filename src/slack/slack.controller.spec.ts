import { Test, TestingModule } from '@nestjs/testing';
import { SlackCommandDto } from './dto/slack-command';
import { ErrorResponseContent } from './response-contents/error-response-content';
import { OkResponseContent } from './response-contents/ok-response-content';
import { SlackController } from './slack.controller';
import { Queue } from 'bull';

describe('SlackController', () => {
  let controller: SlackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlackController],
    })
      .useMocker((token) => {
        if (token == 'BullQueue_slack') {
          return { add: jest.fn() };
        }
      })
      .compile();

    controller = module.get<SlackController>(SlackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should send sol', () => {
    it('should validate the sender', async () => {
      const payload: SlackCommandDto = {
        user_name: '',
        text: '@username 1',
      };
      const result = await controller.sendSol(payload);
      expect(result).toBeInstanceOf(ErrorResponseContent);
    });

    it('should validate the payload text', async () => {
      const payload: SlackCommandDto = {
        user_name: 'username',
        text: '@username 1 extra stuff',
      };
      const result = await controller.sendSol(payload);
      expect(result).toBeInstanceOf(ErrorResponseContent);
    });

    it('should validate the receiver format', async () => {
      const payload: SlackCommandDto = {
        user_name: 'username',
        text: 'username 1',
      };
      const result = await controller.sendSol(payload);
      expect(result).toBeInstanceOf(ErrorResponseContent);
    });

    it('should validate the sol amount', async () => {
      const payload: SlackCommandDto = {
        user_name: 'username',
        text: '@username rich',
      };
      const result = await controller.sendSol(payload);
      expect(result).toBeInstanceOf(ErrorResponseContent);
    });

    it('success', async () => {
      const fromUsername = 'fromUsername';
      const toUsername = 'toUsername';
      const sol = 1;
      const payload: SlackCommandDto = {
        user_name: `${fromUsername}`,
        text: `@${toUsername} ${sol}`,
      };
      const expectedResult = new OkResponseContent(
        `${fromUsername} sent ${sol} SOL to ${toUsername}`,
      );

      const result = await controller.sendSol(payload);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('should airdrop sol', () => {
    it('should validate the sender', async () => {
      const payload: SlackCommandDto = {
        user_name: '',
        text: '1',
      };
      const result = await controller.airdropSol(payload);
      expect(result).toBeInstanceOf(ErrorResponseContent);
    });

    it('should validate the payload text', async () => {
      const payload: SlackCommandDto = {
        user_name: 'username',
        text: '1 extra stuff',
      };
      const result = await controller.airdropSol(payload);
      expect(result).toBeInstanceOf(ErrorResponseContent);
    });

    it('should validate the sol amount', async () => {
      const payload: SlackCommandDto = {
        user_name: 'username',
        text: 'rich',
      };
      const result = await controller.airdropSol(payload);
      expect(result).toBeInstanceOf(ErrorResponseContent);
    });

    it('success', async () => {
      const username = 'test';
      const sol = 1;
      const payload: SlackCommandDto = {
        user_name: username,
        text: `${sol}`,
      };
      const expectedResult = new OkResponseContent(
        `${username} airdropped ${sol} SOL to the wallet.`,
      );

      const result = await controller.airdropSol(payload);
      expect(result).toEqual(expectedResult);
    });
  });
});
