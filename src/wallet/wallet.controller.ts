import { Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  /**
   * Temporary endpoint for creating a wallet
   * REMOVE THIS WHEN YOU ARE READY TO DEPLOY
   */
  @Post('create/:username')
  async create(@Param('username') username: string) {
    const wallet = await this.walletService.create(username);
    return {
      username: wallet.username,
      publicKey: wallet.publicKey,
    };
  }

  @Get('airdrop/:username')
  async airdrop(@Param('username') username: string) {
    return this.walletService.airdrop(username, 1);
  }
}
