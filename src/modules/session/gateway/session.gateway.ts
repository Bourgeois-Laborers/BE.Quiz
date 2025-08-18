import { Injectable, Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ISessionGateway } from './interfaces/session.gateway.interface';

import { ITokenPayload } from '@/modules/auth/services/interfaces/auth.interface';
import { SOCKET_NAMESPACES } from '@/modules/socket/constants/socket.constants';
import { SocketRegistryService } from '@/modules/socket/services/socket-registry.service';

@Injectable()
@WebSocketGateway({
  namespace: SOCKET_NAMESPACES.SESSION,
  cors: {
    origin: true,
    credentials: true,
  },
})
export class SessionGateway
  implements ISessionGateway, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(SessionGateway.name);

  constructor(private readonly socketRegistry: SocketRegistryService) {}

  handleConnection(client: Socket): void {
    const user = (client.data as { user?: ITokenPayload })?.user;

    if (user?.id) {
      this.socketRegistry.addClient(user.id, client);
      this.logger.log(`User ${user.id} connected to session namespace`);
    } else {
      this.logger.warn('User without valid token tried to connect');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket): void {
    const user = (client.data as { user?: ITokenPayload })?.user;

    if (user?.id) {
      this.socketRegistry.removeClient(user.id);
      this.logger.log(`User ${user.id} disconnected from session namespace`);
    }
  }

  broadcastToSession(sessionId: string, event: string, data: unknown): void {
    this.server.in(sessionId).emit(event, data);
    this.logger.log(`Broadcasting event '${event}' to session ${sessionId}`);
  }
}
