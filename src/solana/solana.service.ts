import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  RpcResponseAndContext,
  SignatureResult,
} from '@solana/web3.js';
import { AES, enc } from 'crypto-js';
import { Wallet } from '../wallet/schemas/wallet.schema';
@Injectable()
export class SolanaService {
  generateHashedKeypair(): { publicKey: string; secret: string } {
    const keypair = Keypair.generate();
    return {
      publicKey: keypair.publicKey.toString(),
      secret: AES.encrypt(
        keypair.secretKey.join('-'),
        process.env.NONCE,
      ).toString(),
    };
  }

  getKeypairFromSecret(secret: string): Keypair {
    const secretKey = AES.decrypt(secret, process.env.NONCE)
      .toString(enc.Utf8)
      .split('-')
      .map((key) => parseInt(key, 10));
    return Keypair.fromSecretKey(Uint8Array.from(secretKey));
  }

  async getBalance(
    wallet: Wallet,
  ): Promise<{ publicKey: string; balance: string }> {
    const keypair = this.getKeypairFromSecret(wallet.secret);
    try {
      const connection = new Connection(clusterApiUrl('devnet'));
      const balance =
        (await connection.getBalance(keypair.publicKey)) / LAMPORTS_PER_SOL;
      return {
        publicKey: keypair.publicKey.toString(),
        balance: balance.toFixed(2) + ' SOL',
      };
    } catch (e) {
      throw new InternalServerErrorException(
        "Couldn't get balance of the given wallet on devnet",
      );
    }
  }

  async airdrop(
    wallet: Wallet,
    sol: number,
  ): Promise<RpcResponseAndContext<SignatureResult>> {
    const keypair = this.getKeypairFromSecret(wallet.secret);

    try {
      const connection = new Connection(clusterApiUrl('devnet'));
      // airdrop lamports
      const airdropSignature = await connection.requestAirdrop(
        keypair.publicKey,
        LAMPORTS_PER_SOL * sol,
      );
      return connection.confirmTransaction(airdropSignature);
    } catch (e) {
      throw new InternalServerErrorException(
        "Couldn't airdrop lamports on devnet",
      );
    }
  }
}
