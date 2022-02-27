import { Test, TestingModule } from '@nestjs/testing';
import { SlackServiceStub } from '../__mocks__/slack/slack.service.stub';
import { SendSolDto } from './dto/send-sol.dto';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';

describe('SlackController', () => {
  let controller: SlackController;
  let slackService: SlackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlackController],
      providers: [{ provide: SlackService, useClass: SlackServiceStub }],
    }).compile();

    controller = module.get<SlackController>(SlackController);
    slackService = module.get<SlackService>(SlackService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should send sol', () => {
    it('should validate the sender', async () => {
      const payload: SendSolDto = {
        user_name: '',
        text: '@username 1',
      };
      await expect(controller.sendSol(payload)).rejects.toThrow(
        'SOL sender is required.',
      );
    });

    it('should validate the payload text', async () => {
      const payload: SendSolDto = {
        user_name: 'username',
        text: '@username 1 extra stuff',
      };
      await expect(controller.sendSol(payload)).rejects.toThrow(
        'Invalid format. Please use `@user <sol-amount>`',
      );
    });

    it('should validate the receiver format', async () => {
      const payload: SendSolDto = {
        user_name: 'username',
        text: 'username 1',
      };
      await expect(controller.sendSol(payload)).rejects.toThrow(
        'Invalid receiver format. Please make sure `@` in front of the username.',
      );
    });

    it('should validate the sol amount', async () => {
      const payload: SendSolDto = {
        user_name: 'username',
        text: '@username rich',
      };
      await expect(controller.sendSol(payload)).rejects.toThrow(
        'Invalid SOL amount. It should be a number.',
      );
    });

    it('success', async () => {
      const payload: SendSolDto = {
        user_name: 'username',
        text: '@username 1',
      };
      const expectedResult = { status: 'success' };
      jest.spyOn(slackService, 'sendSol').mockResolvedValue(expectedResult);

      const result = await controller.sendSol(payload);
      expect(result).toEqual(expectedResult);
    });
  });
});
