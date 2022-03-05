import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Wallet } from '../wallet/schemas/wallet.schema';
import {
  solanaStub,
  solanaTransationStub,
} from '../__mocks__/blockchain/solana.stub';
import { SolanaService } from './solana.service';

describe('SolanaService', () => {
  const mockedKeypair = {
    publicKey: 'publicKey',
    secretKey: [1, 2, 3],
  };
  const mockedBalance = 1;
  const mockedUsername = 'username';
  const mockedWallet = new Wallet();
  mockedWallet.username = mockedUsername;
  mockedWallet.publicKey = mockedKeypair.publicKey;
  mockedWallet.secret = 'secret';
  mockedWallet.createdAt = new Date();

  let service: SolanaService;
  let solana: any;
  let solanaTransation: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolanaService,
        { provide: 'SOLANA', useValue: solanaStub },
        { provide: 'SOLANA_TRANSACTION', useValue: solanaTransationStub },
      ],
    }).compile();

    service = module.get<SolanaService>(SolanaService);
    solana = module.get('SOLANA');
    solanaTransation = module.get('SOLANA_TRANSACTION');
  });

  it('should generate hashed Keypair', () => {
    jest.spyOn(solana.Keypair, 'generate').mockReturnValue(mockedKeypair);

    const result = service.generateHashedKeypair(mockedUsername, new Date());
    expect(result.publicKey).toEqual(mockedKeypair.publicKey);
  });

  describe('should get balance', () => {
    it('success', async () => {
      jest
        .spyOn(solana.Keypair, 'fromSecretKey')
        .mockReturnValue(mockedKeypair);
      const mockedConnection = {
        getBalance: () => Promise.resolve(mockedBalance),
      };
      jest.spyOn(solana, 'Connection').mockReturnValue(mockedConnection);

      const result = await service.getBalance(mockedWallet);
      expect(result.balance).toEqual(mockedBalance.toFixed(2) + ' SOL');
    });

    it('should handle the error', async () => {
      jest
        .spyOn(solana.Keypair, 'fromSecretKey')
        .mockReturnValue(mockedKeypair);
      const mockedConnection = {
        getBalance: () => Promise.reject('error'),
      };
      jest.spyOn(solana, 'Connection').mockReturnValue(mockedConnection);

      try {
        await service.getBalance(mockedWallet);
      } catch (e) {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('should airdrop sol', () => {
    it('SOL must be greater than 0.', async () => {
      try {
        await service.airdropSol(mockedWallet, -1);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('handle the error', async () => {
      jest
        .spyOn(solana.Keypair, 'fromSecretKey')
        .mockReturnValue(mockedKeypair);
      const mockedConnection = {
        requestAirdrop: () => Promise.reject('error'),
      };
      jest.spyOn(solana, 'Connection').mockReturnValue(mockedConnection);

      try {
        await service.airdropSol(mockedWallet, 1);
      } catch (e) {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('success', async () => {
      jest
        .spyOn(solana.Keypair, 'fromSecretKey')
        .mockReturnValue(mockedKeypair);
      const mockedConnection = {
        requestAirdrop: () => Promise.resolve(),
        confirmTransaction: () => Promise.resolve(),
      };
      jest.spyOn(solana, 'Connection').mockReturnValue(mockedConnection);

      const result = await service.airdropSol(mockedWallet, 1);
      expect(result).toEqual(
        `Airdrop of 1 SOL to ${mockedWallet.username} was successful.`,
      );
    });
  });

  describe('should send sol', () => {
    beforeEach(() => {
      jest
        .spyOn(solana.Keypair, 'fromSecretKey')
        .mockReturnValue(mockedKeypair);
      jest.spyOn(solanaTransation, 'add').mockReturnValue(null);
      jest.spyOn(solana.SystemProgram, 'transfer').mockReturnValue(null);
      jest.spyOn(solana, 'Connection').mockReturnValue(null);
    });

    it('success', async () => {
      const expectResult = 'success';
      jest
        .spyOn(solana, 'sendAndConfirmTransaction')
        .mockResolvedValue(expectResult);

      const result = await service.sendSol(mockedWallet, mockedWallet, 1);
      expect(result).toEqual(expectResult);
    });

    it('handle the error', async () => {
      jest
        .spyOn(solana, 'sendAndConfirmTransaction')
        .mockRejectedValue('error');

      try {
        await service.sendSol(mockedWallet, mockedWallet, 1);
      } catch (e) {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
