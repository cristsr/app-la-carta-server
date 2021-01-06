import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
