import { Module } from '@nestjs/common';
import { SolanaService } from './solana.service';
import * as solana from '@solana/web3.js';

@Module({
  providers: [
    {
      provide: 'SOLANA',
      useValue: solana,
    },
    {
      provide: 'SOLANA_TRANSACTION',
      useValue: solana.Transaction,
    },
    SolanaService,
  ],
  exports: [SolanaService],
})
export class BlockchainModule {}
