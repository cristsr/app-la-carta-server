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
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Ws.Server;

  handleConnection(client: any, ...args: any[]): any {
    Logger.log('New Client Connected', 'OrdersGateway');
  }

  handleDisconnect(client: any): any {
    Logger.log('Client Disconnected Connected', 'OrdersGateway');
  }

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
