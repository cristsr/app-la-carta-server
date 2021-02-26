import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from '@modules/auth/controllers/auth.controller';
import { AuthService } from '@modules/auth/services/auth.service';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { CONFIG } from '@config/config-keys';
import { UserModule } from '@modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { WsJwtAuthGuard } from '@modules/auth/guards/ws-jwt-auth.guard';
import { AuthGateway } from './gateways/auth.gateway';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(CONFIG.JWT_SECRET_KEY),
        signOptions: {
          expiresIn: configService.get(CONFIG.JWT_EXPIRATION_TIME),
        },
      }),
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    WsJwtAuthGuard,
    AuthGateway,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
