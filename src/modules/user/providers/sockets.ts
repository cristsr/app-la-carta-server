import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class Sockets {
  private users = {};

  register(userId: string, client: any): void {
    this.users[userId] = client;
  }

  getClient(userId: string): any {
    this.logClients();

    if (!this.users[userId]) {
      throw new WsException(`User ${userId} not found`);
    }

    return this.users[userId];
  }

  disconnect(userId): void {
    if (!userId) {
      return;
    }

    delete this.users[userId];
  }

  logClients() {
    const clients = Object.keys(this.users);

    if (!clients.length) {
      Logger.log('Not users connected');
      return;
    }

    Logger.log('Sockets connected');
    console.table(clients);
  }
}
