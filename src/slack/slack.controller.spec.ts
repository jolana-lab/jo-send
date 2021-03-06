import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from '../wallet/wallet.service';
import { SlackServiceStub } from '../__mocks__/slack/slack.service.stub';
import { WalletServiceStub } from '../__mocks__/wallet/wallet.service.stub';
import { SlackCommandDto } from './dto/slack-command.dto';
import { ErrorResponseContent } from './response-contents/error-response-content';
import { OkResponseContent } from './response-contents/ok-response-content';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';

describe('SlackController', () => {
  let controller: SlackController;
  let walletService: WalletService;
  let slackService: SlackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlackController],
      providers: [
        { provide: WalletService, useClass: WalletServiceStub },
        { provide: SlackService, useClass: SlackServiceStub },
      ],
    })
      .useMocker((token) => {
        if (token == 'BullQueue_slack') {
          return { add: jest.fn() };
        }
      })
      .compile();

    controller = module.get<SlackController>(SlackController);
    walletService = module.get<WalletService>(WalletService);
    slackService = module.get<SlackService>(SlackService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should send sol', () => {
    const fromUsername = 'fromUsername';
    const toUsername = 'toUsername';
    const sol = 1;
    const payload: SlackCommandDto = {
      user_name: `${fromUsername}`,
      text: `@${toUsername} ${sol}`,
    };

    it('success', async () => {
      jest.spyOn(slackService, 'parseSendSol').mockReturnValue({
        fromUsername,
        toUsername,
        sol,
      });
      const expectedResult = new OkResponseContent(
        `${fromUsername} sent ${sol} SOL to ${toUsername}`,
      );

      const result = await controller.sendSol(payload);
      expect(result).toEqual(expectedResult);
    });
    it('send error message', async () => {
      jest.spyOn(slackService, 'parseSendSol').mockImplementation(() => {
        throw new Error('error');
      });
      const expectedResult = new ErrorResponseContent('error');

      const result = await controller.sendSol(payload);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('should airdrop sol', () => {
    const username = 'test';
    const sol = 1;
    const payload: SlackCommandDto = {
      user_name: username,
      text: `${sol}`,
    };
    const expectedResult = new OkResponseContent(
      `${username} airdropped ${sol} SOL to the wallet.`,
    );

    it('success', async () => {
      jest.spyOn(slackService, 'parseAirdropSol').mockReturnValue({
        username,
        sol,
      });
      const result = await controller.airdropSol(payload);
      expect(result).toEqual(expectedResult);
    });

    it('send error message', async () => {
      jest.spyOn(slackService, 'parseAirdropSol').mockImplementation(() => {
        throw new Error('error');
      });
      const expectedResult = new ErrorResponseContent('error');

      const result = await controller.airdropSol(payload);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('should check balance', () => {
    it('success', async () => {
      const username = 'test';
      const payload: SlackCommandDto = {
        user_name: username,
        text: '',
      };
      const balance: { publicKey: string; balance: string } = {
        balance: '1',
        publicKey: 'test',
      };
      const expectedResult = new OkResponseContent(
        `${username} has ${balance.balance}.`,
      );
      jest.spyOn(walletService, 'getBalance').mockResolvedValue(balance);

      const result = await controller.checkBalance(payload);
      expect(result).toEqual(expectedResult);
    });

    it('should validate the sender', async () => {
      const payload: SlackCommandDto = {
        user_name: '',
        text: '',
      };
      const result = await controller.checkBalance(payload);
      expect(result).toBeInstanceOf(ErrorResponseContent);
    });

    it('should hanlder wallet not found', async () => {
      const username = 'test';
      const payload: SlackCommandDto = {
        user_name: username,
        text: '',
      };
      jest
        .spyOn(walletService, 'getBalance')
        .mockRejectedValue(new Error('not found'));

      const result = await controller.checkBalance(payload);
      expect(result).toBeInstanceOf(ErrorResponseContent);
    });
  });
});
