import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/services/user.service';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CONFIG } from '@config/config-keys';
import { JwtResponseDto } from '@modules/auth/dto/jwt-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
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
   * register new user
   * @param user
   */
  async register(user: CreateUserDto) {
    const isUser = await this.userService.findByEmail(user.email);

    if (isUser) {
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
