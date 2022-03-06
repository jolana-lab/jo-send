import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from './wallet/wallet.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { SlackModule } from './slack/slack.module';
import { BullModule } from '@nestjs/bull';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env', '.production.env', '.docker.env', '.env'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_PATH),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_PATH,
        port: 6379,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    WalletModule,
    BlockchainModule,
    SlackModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
