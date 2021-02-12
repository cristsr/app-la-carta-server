import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  _id: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
