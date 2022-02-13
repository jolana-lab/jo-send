import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keypair } from '@solana/web3.js';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async create(username: string): Promise<Wallet> {
    const keypair = Keypair.generate();
    // hash the secret key
    const secret: string = await bcrypt.hash(keypair.secretKey.join('-'), 10);

    const wallet = new this.walletModel({
      username,
      secret,
    });
    return wallet.save();
  }
}
