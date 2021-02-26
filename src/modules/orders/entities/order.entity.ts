import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '@modules/user/entities/user.entity';
import { Table } from '@modules/table/entities/table.entity';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  userId: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: Table.name,
  })
  tableId: string;

  @Prop({
    required: true,
  })
  order: {
    name: string;
    price: number;
    quantity: number;
  }[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: false, default: false })
  isCompleted?: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
