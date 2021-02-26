import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): any {
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): any {
    console.log();

    if (err || !user) {
      Logger.error('invalid token', null, 'WsJwtAuthGuard');
      context.getArgByIndex(0).send('unauthorized');
      throw new WsException('unauthorized');
    }

    return user;
  }
}
