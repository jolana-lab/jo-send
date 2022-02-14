import { Injectable } from '@nestjs/common';
import { Keypair } from '@solana/web3.js';
import { AES, enc } from 'crypto-js';

@Injectable()
export class SolanaService {
  generateKeypair(secret: string | null): Keypair {
    if (!secret) {
      return Keypair.generate();
    }
    const secretKey = AES.decrypt(secret, process.env.NONCE)
      .toString(enc.Utf8)
      .split('-')
      .map((key) => parseInt(key, 10));
    return Keypair.fromSecretKey(Uint8Array.from(secretKey));
  }
}
