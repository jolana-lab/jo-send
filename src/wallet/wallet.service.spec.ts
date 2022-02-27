import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SolanaService } from '../blockchain/solana.service';
import { SolanaServiceStub } from '../__mocks__/blockchain/solana.service.stub';
import {
  DUMMY_WALLET,
  WalletModelStub,
} from '../__mocks__/wallet/wallet.module.stub';
import { Wallet } from './schemas/wallet.schema';
import { WalletService } from './wallet.service';

describe('WalletService', () => {
  let walletService: WalletService;
  let solanaService: SolanaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: getModelToken(Wallet.name),
          useValue: WalletModelStub,
        },
        { provide: SolanaService, useClass: SolanaServiceStub },
      ],
    }).compile();

    walletService = module.get<WalletService>(WalletService);
    solanaService = module.get<SolanaService>(SolanaService);
  });

  it('should be defined', () => {
    expect(walletService).toBeDefined();
    expect(solanaService).toBeDefined();
  });

  describe('should get a wallet', () => {
    it('should success', async () => {
      const wallet = await walletService.get(DUMMY_WALLET.username);
      expect(wallet.username).toEqual(DUMMY_WALLET.username);
    });
    it('should handle wallet not found', async () => {
      await expect(walletService.get('not-found')).rejects.toThrow(
        'Wallet not found. username: not-found',
      );
    });
  });

  it('should create a wallet', async () => {
    const expectedWallet = DUMMY_WALLET;
    jest.spyOn(solanaService, 'generateHashedKeypair').mockReturnValue({
      publicKey: expectedWallet.publicKey,
      secret: expectedWallet.secret,
    });

    const wallet = await walletService.create(expectedWallet.username);
    expect(wallet).toEqual(expectedWallet);
  });

  describe('airdrop 1 SOL to the wallet', () => {
    it('should success', async () => {
      const expectedResult = {
        publicKey: 'publicKey',
        balance: '1 SOL',
      };
      jest.spyOn(solanaService, 'airdrop').mockResolvedValue(null);
      jest.spyOn(solanaService, 'getBalance').mockResolvedValue(expectedResult);

      const result = await walletService.airdrop(DUMMY_WALLET.username, 1);
      expect(result).toEqual(expectedResult);
    });
    it('should hanld invaild sol', async () => {
      await expect(
        walletService.airdrop(DUMMY_WALLET.username, -1),
      ).rejects.toThrow('SOL must be greater than 0.');
    });
  });
});
