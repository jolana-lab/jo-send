import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SolanaService } from '../solana/solana.service';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    private solanaService: SolanaService,
  ) {}

  async create(username: string): Promise<Wallet> {
    const hasedKeypair = this.solanaService.generateHashedKeypair();

    const wallet = new this.walletModel({
      username,
      publicKey: hasedKeypair.publicKey,
      secret: hasedKeypair.secret,
    });
    return wallet.save();
  }

  async airdrop(username: string): Promise<{
    publicKey: string;
    balance: string;
  }> {
    // get wallet
    const wallet = await this.walletModel.findOne({ username });
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    await this.solanaService.airdrop(wallet, 1);
    return this.solanaService.getBalance(wallet);
  }
}
