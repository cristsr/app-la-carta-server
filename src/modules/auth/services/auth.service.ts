import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/services/user/user.service';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { CONFIG } from '@config/config-keys';
import { JwtResponseDto } from '@modules/auth/dto/jwt-response.dto';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPasswordDto } from '@modules/user/dto/forgot-password.dto';
import { UserDocument } from '@modules/user/entities/user.entity';
import { RecoveryPasswordService } from '@modules/user/services/recovery-password/recovery-password.service';
import { RecoveryPasswordDocument } from '@modules/user/entities/recovery-password.entity';
import { passwordRecovery } from '@mail/templates/templates';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private userService: UserService,
    private recoveryPasswordService: RecoveryPasswordService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  /**
   * validate if user exist and given password is correct
   * called by passport local strategy
   * @param username
   * @param pass
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(username);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(pass, user.password).catch((err) => {
      throw new InternalServerErrorException(err.message);
    });

    if (!isMatch) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    return {
      _id: user._id,
      name: user.name,
      image: user.image,
      email: user.email,
    };
  }

  /**
   * create jwt after user validation
   * @param user model created in jwt strategy
   */
  async login(user: any) {
    const payload = {
      _id: user._id,
      username: user.name,
      email: user.email,
    };

    const jwtResponse: JwtResponseDto = {
      accessToken: this.jwtService.sign(payload),
      tokenType: 'Bearer',
      expiresIn: this.config.get(CONFIG.JWT_EXPIRATION_TIME),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.config.get(CONFIG.REFRESH_SECRET_KEY),
      }),
    };

    return {
      credentials: jwtResponse,
      user: payload,
    };
  }

  /**
   * Register new user
   * @param user
   */
  async register(user: CreateUserDto) {
    if (await this.userService.findByEmail(user.email)) {
      throw new BadRequestException(
        'El correo electronico ya se encuentra registrado',
      );
    }

    user.password = await bcrypt.hash(
      user.password,
      +this.config.get(CONFIG.BCRYPT_SALT_OR_ROUNDS),
    );

    await this.userService.create(user);

    return {
      success: true,
    };
  }

  /**
   * Search user by email and send a email with a token to recovery account
   * @param user
   */
  async forgotPassword(user: ForgotPasswordDto) {
    const record: UserDocument | null = await this.userService.findByEmail(
      user.email,
    );

    if (!record) {
      throw new BadRequestException(
        'El correo electronico no se encuentra registrado',
      );
    }

    // User is registered
    const minute = 60000;
    const currentDate = new Date().getTime();
    const dueDate = new Date(currentDate + 1 * minute).toISOString();
    const recoveryToken = randomBytes(32).toString('hex');

    await this.recoveryPasswordService.create({
      user: record._id,
      dueDate,
      recoveryToken,
    });

    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: 'test@applacarta.com',
        subject:
          'Solicitud de recuperacion de contraseña para su cuenta de applacarta ✔',
        html: passwordRecovery({
          email: user.email,
          recoveryToken,
        }),
      });
    } catch (e) {
      Logger.error(e.message, '', 'Send Mail Error');
      throw new InternalServerErrorException(
        'No se pudo enviar el correo al usuario registrado',
      );
    }

    return {
      success: true,
    };
  }

  /**
   * Search a recovery account record by token given previously via email
   * and set the new password to user;
   * @param recoveryToken
   * @param password
   */
  async recoveryPassword(recoveryToken: string, password: string) {
    const record: RecoveryPasswordDocument | null = await this.recoveryPasswordService.findOne(
      recoveryToken,
    );

    if (!record) {
      throw new BadRequestException('Token de recuperacion invalido o nulo');
    }

    // return record;
    const currentDate = new Date();
    const dueDate = new Date(record.dueDate);

    if (currentDate > dueDate) {
      throw new UnprocessableEntityException(
        'El token de recuperacion ha caducado',
      );
    }

    record.user.password = await bcrypt.hash(
      password,
      +this.config.get(CONFIG.BCRYPT_SALT_OR_ROUNDS),
    );

    await record.user.save();

    return {
      success: true,
    };
  }

  /**
   * Refresh token
   * @param user
   */
  async refresh(user: any) {
    const payload = {
      _id: user._id,
      username: user.name,
      email: user.email,
    };

    const jwtResponse: JwtResponseDto = {
      accessToken: this.jwtService.sign(payload),
      tokenType: 'Bearer',
      expiresIn: this.config.get(CONFIG.JWT_EXPIRATION_TIME),
    };

    return jwtResponse;
  }
}
