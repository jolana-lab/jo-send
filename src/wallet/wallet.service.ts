import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const createdAt = new Date();
    const hasedKeypair = this.solanaService.generateHashedKeypair(
      username,
      createdAt,
    );

    const wallet = new this.walletModel({
      username,
      publicKey: hasedKeypair.publicKey,
      secret: hasedKeypair.secret,
      createdAt,
    });
    return wallet.save();
  }

  async airdrop(
    username: string,
    sol: number,
  ): Promise<{
    publicKey: string;
    balance: string;
  }> {
    // validate sol
    if (sol <= 0) {
      throw new BadRequestException('SOL must be greater than 0.');
    }
    // get wallet
    const wallet = await this.walletModel.findOne({ username });
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    await this.solanaService.airdrop(wallet, sol);
    return this.solanaService.getBalance(wallet);
  }
}
