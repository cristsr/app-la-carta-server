import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): any {
    const ctx = context.switchToWs();
    const client = ctx.getClient();
    const token = client.request.headers.authorization.substr(7);

    try {
      this.jwt.verify(token);
      return true;
    } catch (error) {
      Logger.debug(error, 'WsJwtAuthGuard invalid token');
      return false;
    }
  }
}
