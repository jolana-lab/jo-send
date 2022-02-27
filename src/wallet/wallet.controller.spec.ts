import { Test, TestingModule } from '@nestjs/testing';
import { DUMMY_WALLET } from '../__mocks__/wallet/wallet.module.stub';
import { WalletServiceStub } from '../__mocks__/wallet/wallet.service.stub';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

describe('WalletController', () => {
  let controller: WalletController;
  let walletService: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [{ provide: WalletService, useClass: WalletServiceStub }],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    walletService = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a wallet', async () => {
    const expectedResult = {
      username: DUMMY_WALLET.username,
      publicKey: DUMMY_WALLET.publicKey,
    };
    jest.spyOn(walletService, 'create').mockResolvedValue(DUMMY_WALLET);
    const result = await controller.create(DUMMY_WALLET.username);
    expect(result).toEqual(expectedResult);
  });

  it('should airdrop 1 SOL to a wallet', async () => {
    const expectedResult = { publicKey: 'publicKey', balance: '1' };
    jest.spyOn(walletService, 'airdrop').mockResolvedValue(expectedResult);
    const result = await controller.airdrop(DUMMY_WALLET.username);
    expect(result).toEqual(expectedResult);
  });
});
