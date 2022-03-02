import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  Cluster,
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  RpcResponseAndContext,
  sendAndConfirmTransaction,
  SignatureResult,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { AES, enc } from 'crypto-js';
import { Wallet } from '../wallet/schemas/wallet.schema';
@Injectable()
export class SolanaService {
  generateHashedKeypair(
    username: string,
    createdAt: Date,
  ): {
    publicKey: string;
    secret: string;
  } {
    const keypair = Keypair.generate();
    return {
      publicKey: keypair.publicKey.toString(),
      secret: AES.encrypt(
        keypair.secretKey.join('-'),
        username + createdAt.toISOString() + process.env.NONCE,
      ).toString(),
    };
  }

  async getBalance(
    wallet: Wallet,
  ): Promise<{ publicKey: string; balance: string }> {
    const keypair = this.getKeypairFromSecret(wallet);
    try {
      const connection = this.getConnection();
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

  async airdropSol(
    wallet: Wallet,
    sol: number,
  ): Promise<RpcResponseAndContext<SignatureResult>> {
    // validate sol
    if (sol <= 0) {
      throw new BadRequestException('SOL must be greater than 0.');
    }

    const keypair = this.getKeypairFromSecret(wallet);
    try {
      const connection = this.getConnection();
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

  async sendSol(
    fromWallet: Wallet,
    toWallet: Wallet,
    sol: number,
  ): Promise<string> {
    const fromKeypair = this.getKeypairFromSecret(fromWallet);
    const toKeypair = this.getKeypairFromSecret(toWallet);

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toKeypair.publicKey,
        lamports: sol * LAMPORTS_PER_SOL,
      }),
    );

    try {
      const connection = this.getConnection();
      return sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
    } catch (e) {
      throw new InternalServerErrorException(
        "Couldn't send lamports on devnet",
      );
    }
  }

  private getKeypairFromSecret(wallet: Wallet): Keypair {
    const secretKey = AES.decrypt(
      wallet.secret,
      wallet.username + wallet.createdAt.toISOString() + process.env.NONCE,
    )
      .toString(enc.Utf8)
      .split('-')
      .map((key) => parseInt(key, 10));
    return Keypair.fromSecretKey(Uint8Array.from(secretKey));
  }

  private getConnection(): Connection {
    return new Connection(clusterApiUrl(process.env.SOLANA_NETWORK as Cluster));
  }
}
