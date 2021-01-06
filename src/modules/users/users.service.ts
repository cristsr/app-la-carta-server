import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import {
  Restaurant,
  RestaurantDocument,
} from '../../database/restauran.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
    private configService: ConfigService,
  ) {}

  async create(createCatDto: any): Promise<any> {
    const createdRestaurant = new this.restaurantModel(createCatDto);
    return createdRestaurant.save();
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().exec();
  }

  async findOne(username: string): Promise<any> {
    return this.restaurantModel
      .find({
        email: username,
      })
      .exec();
  }
}
