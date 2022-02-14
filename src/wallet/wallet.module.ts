import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolanaModule } from 'src/solana/solana.module';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    SolanaModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
