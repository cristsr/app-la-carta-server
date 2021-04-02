import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';
import * as Ws from 'ws';
import { Logger } from '@nestjs/common';
import { Sockets } from '../providers/sockets';
import { ResponseOrderDto } from '@modules/orders/dto/response-order.dto';

@WebSocketGateway()
export class UserGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Ws.Server;

  constructor(private sockets: Sockets) {}

  handleDisconnect(clientRef: any): any {
    this.sockets.disconnect(clientRef.id);
    Logger.log(`Client ${clientRef.id} Disconnected`, 'OrdersGateway');
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() userId: string, @ConnectedSocket() clientRef) {
    clientRef.id = userId;
    this.sockets.register(userId, clientRef);
    Logger.log(`User ${userId} is connected`, 'UserGateway');
  }

  @OnEvent('order.created', { async: true })
  handleOrderCreatedEvent(payload: ResponseOrderDto, userId: string) {
    try {
      this.sockets.getClient(userId).send(
        JSON.stringify({
          event: 'newOrder',
          data: payload,
        }),
      );
      Logger.log(
        `order ${payload.id} sent successfully to user ${userId}`,
        'UserGateway',
      );
    } catch (e) {
      Logger.error(e.message, null, 'UserGateway');
    }
  }
}
