import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import {
  RecoveryPassword,
  RecoveryPasswordDocument,
} from '@modules/user/entities/recovery-password.entity';
import { RecoveryPasswordDto } from '@modules/user/dto/recovery-password.dto';

@Injectable()
export class RecoveryPasswordService {
  constructor(
    @InjectModel(RecoveryPassword.name)
    private recoveryPasswordModel: Model<RecoveryPasswordDocument>,
  ) {}

  create(
    recoveryPassword: RecoveryPasswordDto,
  ): Promise<RecoveryPasswordDocument> {
    return this.recoveryPasswordModel.create(recoveryPassword);
  }

  findOne(hash): Promise<RecoveryPasswordDocument> {
    return this.recoveryPasswordModel
      .findOne({ hash })
      .then((record: RecoveryPasswordDocument) =>
        record.populate({ path: 'user' }).execPopulate(),
      );
  }

  update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<RecoveryPasswordDocument> {
    return this.recoveryPasswordModel
      .findByIdAndUpdate(id, updateUserDto)
      .exec();
  }

  remove(id: string): Promise<RecoveryPasswordDocument> {
    return this.recoveryPasswordModel.findByIdAndDelete(id).exec();
  }
}
