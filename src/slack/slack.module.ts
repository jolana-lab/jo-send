import { Module } from '@nestjs/common';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { WalletModule } from '../wallet/wallet.module';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';

@Module({
  imports: [WalletModule, BlockchainModule],
  controllers: [SlackController],
  providers: [SlackService],
})
export class SlackModule {}
