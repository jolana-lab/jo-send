import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keypair } from '@solana/web3.js';
import { AES, enc } from 'crypto-js';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async create(username: string): Promise<Wallet> {
    const keypair = Keypair.generate();
    const secret = AES.encrypt(keypair.secretKey.join('-'), process.env.NONCE);

    const wallet = new this.walletModel({
      username,
      secret,
    });
    return wallet.save();
  }

  async airdrop(username: string) {
    const wallet = await this.walletModel.findOne({ username });
    const secret = AES.decrypt(wallet.secret, process.env.NONCE).toString(
      enc.Utf8,
    );
  }
}
