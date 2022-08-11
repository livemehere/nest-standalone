import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, { transports: ['websocket'], cors: true })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(client.id);
    console.log('user connect');
  }

  handleDisconnect(client: any) {
    console.log(client.id);
    console.log('user disconnect');
  }

  @SubscribeMessage('chat')
  async onChat(client: Socket, message) {
    console.log(message);
    this.server.emit('chat', message);
  }
}
