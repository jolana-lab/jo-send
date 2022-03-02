import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SolanaService } from '../blockchain/solana.service';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    private solanaService: SolanaService,
  ) {}

  async get(username: string): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({ username });
    if (!wallet) {
      throw new NotFoundException('Wallet not found. username: ' + username);
    }
    return wallet;
  }

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

  async getOrCreate(username: string): Promise<Wallet> {
    try {
      return await this.get(username);
    } catch (e) {
      return await this.create(username);
    }
  }
}
