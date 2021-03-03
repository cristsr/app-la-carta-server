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

  handleDisconnect(client: any): any {
    client.send('asdsad');
    Logger.log('Client Disconnected', 'OrdersGateway');
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() userId: string, @ConnectedSocket() client) {
    this.sockets.register(userId, client);
  }

  @OnEvent('order.created', { async: false })
  handleOrderCreatedEvent(payload: ResponseOrderDto, userId) {
    try {
      this.sockets.getClient(userId).send(
        JSON.stringify({
          event: 'newOrder',
          data: payload,
        }),
      );
      Logger.log(`order ${payload.id} sent successfully`, 'UserGateway');
    } catch (e) {
      Logger.error(e.message, null, 'UserGateway');
    }
  }
}
