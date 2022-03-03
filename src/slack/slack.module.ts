import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { WalletModule } from '../wallet/wallet.module';
import { SlackController } from './slack.controller';
import { SlackProcessor } from './slack.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'slack',
    }),
    WalletModule,
    BlockchainModule,
  ],
  controllers: [SlackController],
  providers: [SlackProcessor],
})
export class SlackModule {}
