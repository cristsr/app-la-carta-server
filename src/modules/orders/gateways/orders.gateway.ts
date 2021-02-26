import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
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
    Logger.log('Client Disconnected Connected', 'OrdersGateway');
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('newOrder')
  handleMessage(@MessageBody() data: string, @Request() req): string {
    console.log(req.headers);
    return 'Hello world!';
  }

  @OnEvent('order.created', { async: true })
  handleOrderCreatedEvent(payload: any) {
    this.server.clients.forEach((client) => {
      client.send(JSON.stringify(payload));
    });
  }
}
