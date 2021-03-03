import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserGateway } from '@modules/user/gateways/user.gateway';
import { Sockets } from '@modules/user/providers/sockets';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserGateway, Sockets],
  exports: [UserService],
})
export class UserModule {}
