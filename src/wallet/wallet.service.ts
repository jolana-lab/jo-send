import { Injectable } from '@nestjs/common';
import { Keypair } from '@solana/web3.js';

@Injectable()
export class WalletService {
  async create() {
    const keypair = Keypair.generate();
    const secret = keypair.secretKey.join('-');
  }
}
