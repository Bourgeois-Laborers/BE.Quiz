import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from '@event/event.service';

@WebSocketGateway(80, {
  cors: {
    origin: '*',
  },
})
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(EventGateway.name);

  constructor(private readonly socketService: SocketService) {}

  @WebSocketServer() io: Server;

  afterInit(): void {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket): void {
    const { sockets } = this.io.sockets;

    this.socketService.handleConnection(client);

    this.logger.log(`Client id: ${client.id} connected`);

    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client id:${client.id} disconnected`);
  }
}
