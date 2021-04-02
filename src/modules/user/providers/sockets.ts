import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class Sockets {
  private users = new Map<string, any>();

  register(userId: string, client): void {
    this.users.set(userId, client);
  }

  getClient(userId: string): any {
    if (!this.users.has(userId)) {
      throw new WsException(`User ${userId} not found`);
    }
    return this.users.get(userId);
  }

  disconnect(userId): void {
    this.users.delete(userId);
  }

  logClients() {
    const clients = Object.keys(this.users);
    Logger.log('Sockets connected');
    console.table(clients);
  }
}
