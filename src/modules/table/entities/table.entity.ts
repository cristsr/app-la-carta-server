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
