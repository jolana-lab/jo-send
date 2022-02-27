import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from './wallet/wallet.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env', '.production.env', '.env'],
    }),
    MongooseModule.forRoot(process.env.DATABASE_PATH),
    WalletModule,
    BlockchainModule,
    SlackModule,
  ],
})
export class AppModule {}
