import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user/user.service';
import { UserGateway } from '@modules/user/gateways/user.gateway';
import { Sockets } from '@modules/user/providers/sockets';
import { RecoveryPasswordService } from './services/recovery-password/recovery-password.service';
import {
  RecoveryPassword,
  RecoveryPasswordSchema,
} from '@modules/user/entities/recovery-password.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RecoveryPassword.name, schema: RecoveryPasswordSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserGateway, Sockets, RecoveryPasswordService],
  exports: [UserService, RecoveryPasswordService],
})
export class UserModule {}
