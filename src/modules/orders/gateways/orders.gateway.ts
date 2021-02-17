import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';
import * as Ws from 'ws';

@WebSocketGateway()
export class OrdersGateway {
  @WebSocketServer()
  server: Ws.Server;

  @SubscribeMessage('newOrder')
  handleMessage(@MessageBody() data: string): string {
    return 'Hello world!';
  }

  @OnEvent('order.created', { async: true })
  handleOrderCreatedEvent(payload: any) {
    console.log(payload);
    this.server.clients.forEach((client) => {
      client.send(JSON.stringify(payload));
    });
  }
}
