import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env', '.production.env'],
    }),
    WalletModule,
  ],
})
export class AppModule {}
