import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@modules/user/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  remove(id: number): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
