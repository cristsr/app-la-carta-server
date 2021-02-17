import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '@modules/user/entities/user.entity';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.virtual('id').get(function () {
  return this._id;
});
