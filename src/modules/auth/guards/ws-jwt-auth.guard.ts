import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import * as Ws from 'ws';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): any {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, host: ExecutionContext): any {
    if (user) {
      return user;
    }

    Logger.error('invalid token', null, 'WsJwtAuthGuard');
    const ctx = host.switchToWs();
    const client = ctx.getClient<Ws>();
    client.send(
      JSON.stringify({
        event: 'unauthorized',
      }),
    );
    client.close(4001);
    throw new WsException('unauthorized');
  }
}
