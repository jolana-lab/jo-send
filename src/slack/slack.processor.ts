import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SolanaService } from '../blockchain/solana.service';
import { WalletService } from '../wallet/wallet.service';

@Processor('slack')
export class SlackProcessor {
  constructor(
    private walletService: WalletService,
    private solanaService: SolanaService,
  ) {}

  @Process('send-sol')
  async sendSol(job: Job) {
    const { fromUsername, toUsername, sol } = job.data;
    const fromWallet = await this.walletService.getOrCreate(fromUsername);
    const toWallet = await this.walletService.getOrCreate(toUsername);
    return await this.solanaService.sendSol(fromWallet, toWallet, sol);
  }

  @Process('airdrop-sol')
  async airdropSol(job: Job) {
    const { username, sol } = job.data;
    const wallet = await this.walletService.getOrCreate(username);
    return await this.solanaService.airdropSol(wallet, sol);
  }
}
