import { Test, TestingModule } from '@nestjs/testing';
import { SlackServiceStub } from '../__mocks__/slack/slack.service.stub';
import { SlackCommandDto } from './dto/slack-command';
import { ErrorResponseContent } from './response-contents/error-response-content';
import { OkResponseContent } from './response-contents/ok-response-content';
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
      const payload: SlackCommandDto = {
        user_name: 'username',
        text: '@username 1',
      };
      const expectedResult = new OkResponseContent('OK');
      jest.spyOn(slackService, 'sendSol').mockResolvedValue(expectedResult);

      const result = await controller.sendSol(payload);
      expect(result).toEqual(expectedResult);
    });
  });
});
