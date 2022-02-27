import { Injectable } from '@nestjs/common';
import { SolanaService } from '../blockchain/solana.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class SlackService {
  constructor(
    private walletService: WalletService,
    private solanaService: SolanaService,
  ) {}

  async sendSol(
    fromUsername: string,
    toUsername: string,
    sol: number,
  ): Promise<string> {
    const fromWallet = await this.walletService.get(fromUsername);
    const toWallet = await this.walletService.get(toUsername);
    return await this.solanaService.sendSol(fromWallet, toWallet, sol);
  }
}
