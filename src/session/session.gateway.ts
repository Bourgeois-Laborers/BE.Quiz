import { Logger } from '@nestjs/common';
import { WebSocketGateway, OnGatewayInit, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { EventName } from '@common/types/event-name.enum';

@WebSocketGateway(80, { namespace: 'session', cors: { origin: '*' } })
export class SessionGateway implements OnGatewayInit {
  @WebSocketServer() io: Server;

  private readonly logger = new Logger(SessionGateway.name);

  constructor(private connectedClients: Map<string, Socket> = new Map()) {}

  afterInit(): void {
    this.logger.log('Initialized');
  }

  @SubscribeMessage(EventName.SESSION_JOIN)
  async handleSessionJoin(message: { sessionId: string; userId: string; userAlias: string }): Promise<void> {
    const client = this.connectedClients.get(message.userId);
    this.logger.log(`Client ${client.id} joined session ${message.sessionId}`);
    await client.join(message.sessionId);
    this.io.to(message.sessionId).emit(EventName.SESSION_JOINED, { userId: client.id, userAlias: message.userAlias });
  }

  @SubscribeMessage(EventName.SESSION_LEAVE)
  async handleSessionLeave(message: { sessionId: string; userId: string; userAlias: string }): Promise<void> {
    const client = this.connectedClients.get(message.userId);
    this.logger.log(`Client ${client.id} leaved session ${message.sessionId}`);
    await client.leave(message.sessionId);
    this.io.to(message.sessionId).emit(EventName.SESSION_LEAVED, { userId: client.id, userAlias: message.userAlias });
    this.connectedClients.delete(message.userId);
  }
}
