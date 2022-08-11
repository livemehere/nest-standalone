import { Client } from 'socket.io/dist/client';
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
    client.join('A');

    console.log('user connect');
  }

  handleDisconnect(client: any) {
    console.log(client.id);
    console.log('user disconnect');
  }

  @SubscribeMessage('chat')
  async onChat(client: Socket, message) {
    console.log(message);
    this.server.to('A').emit('chat', message);
  }

  @SubscribeMessage('leave')
  async leaveRoom(client: Socket, message) {
    client.leave('A');
  }

  async sendAll(msg: string) {
    console.log(this.server.emit('chat', { sender: 'server', msg }));
  }
}
