import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class AuthGateway implements OnGatewayConnection {
  handleConnection(client: any, req: any): any {
    client.headers = req.headers;
  }
}
