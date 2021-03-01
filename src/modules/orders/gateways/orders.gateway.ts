import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';
import * as Ws from 'ws';
import { Logger, Request, UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '@modules/auth/guards/ws-jwt-auth.guard';

@WebSocketGateway()
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Ws.Server;

  handleConnection(client: any, ...args: any[]): any {}

  handleDisconnect(client: any): any {
    client.send('asdsad');
    Logger.log('Client Disconnected', 'OrdersGateway');
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('newOrder')
  handleMessage(@MessageBody() data: string): string {
    return 'Hello world!';
  }

  @OnEvent('order.created', { async: true })
  handleOrderCreatedEvent(payload: any) {
    this.server.clients.forEach((client) => {
      client.send(JSON.stringify(payload));
    });
  }
}
