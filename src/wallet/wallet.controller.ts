import { Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create')
  async create() {
    await this.walletService.create('jo-send-local');
  }

  @Get('airdrop/:username')
  async airdrop(@Param('username') username: string) {
    return this.walletService.airdrop(username);
  }
}
