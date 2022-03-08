import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccDocument = Acc & Document;

@Schema()
export class Acc {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  balance: number;

  @Prop()
  stocks: string[];

}

export const AccSchema = SchemaFactory.createForClass(Acc);
