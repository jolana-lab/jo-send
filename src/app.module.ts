import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from './wallet/wallet.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { SlackModule } from './slack/slack.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env', '.production.env', '.env'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_PATH),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_PATH,
        port: 6379,
      },
    }),
    WalletModule,
    BlockchainModule,
    SlackModule,
  ],
})
export class AppModule {}
