import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import * as Ws from 'ws';

@WebSocketGateway()
export class AuthGateway {
  /**
   * After each socket connection, connection property is
   * added to socket, then request is visible in execution context
   * @param server
   */
  async afterInit(server: Ws.Server) {
    server.on('connection', (socket, request) => (socket['request'] = request));
  }
}
