import { Test, TestingModule } from '@nestjs/testing';
import { SolanaService } from '../blockchain/solana.service';
import { WalletService } from '../wallet/wallet.service';
import { SolanaServiceStub } from '../__mocks__/blockchain/solana.service.stub';
import { DUMMY_WALLET } from '../__mocks__/wallet/wallet.module.stub';
import { WalletServiceStub } from '../__mocks__/wallet/wallet.service.stub';
import { ErrorResponseContent } from './response-contents/error-response-content';
import { OkResponseContent } from './response-contents/ok-response-content';
import { SlackService } from './slack.service';

describe('SlackService', () => {
  let slackService: SlackService;
  let walletService: WalletService;
  let solanaService: SolanaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlackService,
        { provide: WalletService, useClass: WalletServiceStub },
        { provide: SolanaService, useClass: SolanaServiceStub },
      ],
    }).compile();

    slackService = module.get<SlackService>(SlackService);
    walletService = module.get<WalletService>(WalletService);
    solanaService = module.get<SolanaService>(SolanaService);
  });

  it('should be defined', () => {
    expect(slackService).toBeDefined();
  });

  describe('should send SOL', () => {
    const fromUsername = 'fromUsername';
    const toUsername = 'toUsername';
    const sol = 1;

    it('success', async () => {
      const expectedResult = new OkResponseContent(
        `${fromUsername} sent ${sol} SOL to ${toUsername}`,
      );

      jest.spyOn(walletService, 'getOrCreate').mockResolvedValue(DUMMY_WALLET);
      jest.spyOn(solanaService, 'sendSol').mockResolvedValue('OK');

      const result = await slackService.sendSol(fromUsername, toUsername, sol);
      expect(result).toEqual(expectedResult);
    });

    it('should handler internal error', async () => {
      jest
        .spyOn(walletService, 'getOrCreate')
        .mockRejectedValue(new Error('error'));
      const result = await slackService.sendSol(fromUsername, toUsername, sol);
      expect(result).toBeInstanceOf(ErrorResponseContent);
    });
  });
});
