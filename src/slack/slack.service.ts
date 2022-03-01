import { Injectable } from '@nestjs/common';
import { SolanaService } from '../blockchain/solana.service';
import { WalletService } from '../wallet/wallet.service';
import { ErrorResponseContent } from './response-contents/error-response-content';
import { OkResponseContent } from './response-contents/ok-response-content';
import { ResponseContent } from './response-contents/response-content';

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
  ): Promise<ResponseContent> {
    try {
      const fromWallet = await this.walletService.get(fromUsername);
      const toWallet = await this.walletService.get(toUsername);
      await this.solanaService.sendSol(fromWallet, toWallet, sol);
      return new OkResponseContent(
        `${fromUsername} sent ${sol} SOL to ${toUsername}`,
      );
    } catch (e) {
      return new ErrorResponseContent(e.message);
    }
  }
}
