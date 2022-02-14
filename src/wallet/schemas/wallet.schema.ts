import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Wallet {
  @Prop({ required: true, unique: true, dropDups: true })
  username: string;

  @Prop({ required: true, unique: true, dropDups: true })
  publicKey: string;

  @Prop({ required: true })
  secret: string;

  @Prop({ required: true })
  createdAt: Date;
}

export type WalletDocument = Wallet & Document;

export const WalletSchema = SchemaFactory.createForClass(Wallet);
