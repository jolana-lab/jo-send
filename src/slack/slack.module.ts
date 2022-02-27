import { Module } from '@nestjs/common';
import { WalletModule } from '../wallet/wallet.module';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';

@Module({
  imports: [WalletModule],
  controllers: [SlackController],
  providers: [SlackService],
})
export class SlackModule {}
