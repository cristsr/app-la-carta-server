import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@modules/user/entities/user.entity';

export type TableDocument = Table & Document;

@Schema()
export class Table {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: string;
}

export const TableSchema = SchemaFactory.createForClass(Table);

TableSchema.virtual('table', {
  ref: 'Order', //Organization is in relation with User
  localField: '_id', //field that Organization holds as proof of relation
  foreignField: 'tableId', //field that User holds as proof of relation
});
