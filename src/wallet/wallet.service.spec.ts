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

  describe('should get or create a wallet', () => {
    it('should get an existing wallet', async () => {
      const expectedWallet = new Wallet();
      jest
        .spyOn(walletService, 'get')
        .mockReturnValue(Promise.resolve(expectedWallet));

      await walletService.getOrCreate(expectedWallet.username);
      expect(walletService.get).toHaveBeenCalledTimes(1);
    });
    it('should create a new wallet', async () => {
      const expectedWallet = new Wallet();
      jest
        .spyOn(walletService, 'get')
        .mockRejectedValue(new Error('Wallet not found'));
      jest
        .spyOn(walletService, 'create')
        .mockReturnValue(Promise.resolve(expectedWallet));

      await walletService.getOrCreate(expectedWallet.username);
      expect(walletService.get).toHaveBeenCalledTimes(1);
      expect(walletService.create).toHaveBeenCalledTimes(1);
    });
  });

  it('should get balance', async () => {
    const expectedWallet = new Wallet();
    const balance: { publicKey: string; balance: string } = {
      balance: '1',
      publicKey: 'test',
    };
    jest
      .spyOn(walletService, 'get')
      .mockReturnValue(Promise.resolve(expectedWallet));
    jest.spyOn(solanaService, 'getBalance').mockResolvedValue(balance);

    const result = await walletService.getBalance(expectedWallet.username);
    expect(result).toEqual(balance);
  });
});
