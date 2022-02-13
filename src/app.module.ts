import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env', '.production.env'],
    }),
    MongooseModule.forRoot(process.env.DATABASE_PATH),
    WalletModule,
  ],
})
export class AppModule {}
