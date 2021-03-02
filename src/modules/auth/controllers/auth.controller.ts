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
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

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

  @Public()
  @Get('sendMail')
  async sendMail() {
    return this.mailerService.sendMail({
      to: 'styven21121@gmail.com', // list of receivers
      from: 'noreply@nestjs.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    });
  }
}
