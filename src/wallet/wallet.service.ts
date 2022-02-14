import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { AES, enc } from 'crypto-js';
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
    const keypair = Keypair.generate();
    const secret = AES.encrypt(keypair.secretKey.join('-'), process.env.NONCE);

    const wallet = new this.walletModel({
      username,
      publicKey: keypair.publicKey.toString(),
      secret,
    });
    return wallet.save();
  }

  async airdrop(username: string) {
    // get wallet
    const wallet = await this.walletModel.findOne({ username });
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    // get keypair from secret
    const secret = AES.decrypt(wallet.secret, process.env.NONCE)
      .toString(enc.Utf8)
      .split('-')
      .map((key) => parseInt(key, 10));
    const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));

    try {
      const connection = new Connection(clusterApiUrl('devnet'));
      // airdrop lamports
      const airdropSignature = await connection.requestAirdrop(
        keypair.publicKey,
        LAMPORTS_PER_SOL,
      );
      await connection.confirmTransaction(airdropSignature);
      const balance =
        (await connection.getBalance(keypair.publicKey)) / LAMPORTS_PER_SOL;
      return {
        publicKey: keypair.publicKey.toString(),
        balance: balance.toFixed(2) + ' SOL',
      };
    } catch (e) {
      throw new InternalServerErrorException(
        "Couldn't airdrop lamports on devnet",
      );
    }
  }
}
