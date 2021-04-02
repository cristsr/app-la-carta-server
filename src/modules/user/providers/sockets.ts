import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class Sockets {
  private users = new Map<string, any>();

  register(userId: string, client): void {
    this.users.set(userId, client);
  }

  getClient(userId: string): any {
    Logger.log(this.users.has(userId), `Exist user ${userId}`);

    if (!this.users.has(userId)) {
      throw new WsException(`User ${userId} not found`);
    }

    return this.users.get(userId);
  }

  disconnect(userId): void {
    this.users.delete(userId);
  }

  logClients() {
    const clients = [...this.users.keys()];

    if (!clients.length) {
      Logger.log('Not users connected');
      return;
    }

    Logger.log('Sockets connected');
    console.table(clients);
  }
}
