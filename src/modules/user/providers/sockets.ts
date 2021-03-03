import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

interface User {
  [key: string]: any;
}

@Injectable()
export class Sockets {
  private users: User = {};

  register(userId: string, client) {
    this.users[userId] = client;
  }

  getClient(userId: string): any {
    if (!this.users[userId]) {
      throw new WsException('User not found');
    }
    return this.users[userId];
  }
}
