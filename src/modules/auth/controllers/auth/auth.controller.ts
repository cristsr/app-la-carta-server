import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../../../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() data: any) {
    return this.userService.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
