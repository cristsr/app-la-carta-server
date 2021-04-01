import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@modules/auth/services/auth.service';
import { Public } from '@modules/auth/decorators/public';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { userCreatedSuccessfully } from '../../../mail/templates/templates';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    Logger.debug(req.user);
    return req.user;
  }

  @Get('refresh')
  refreshToken(@Request() request) {
    return this.authService.refresh(request.user);
  }
}
