import { Logger } from '@nestjs/common';
import { WebSocketGateway, OnGatewayInit, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { EventName } from '@common/types/event-name.enum';

@WebSocketGateway(80, { namespace: 'session' })
export class SessionGateway implements OnGatewayInit {
  @WebSocketServer() io: Server;

  private readonly logger = new Logger(SessionGateway.name);

  afterInit(): void {
    this.logger.log('Initialized');
  }

  @SubscribeMessage(EventName.SESSION_JOIN)
  async handleSessionJoin(client: Socket, message: { sessionId: string; userAlias: string }): Promise<void> {
    this.logger.log(`Client ${client.id} joined session ${message.sessionId}`);
    await client.join(message.sessionId);
    this.io.to(message.sessionId).emit(EventName.SESSION_JOINED, { userId: client.id, userAlias: message.userAlias });
  }

  @SubscribeMessage(EventName.SESSION_LEAVE)
  async handleSessionLeave(client: Socket, message: { sessionId: string; userAlias: string }): Promise<void> {
    this.logger.log(`Client ${client.id} leaved session ${message.sessionId}`);
    await client.leave(message.sessionId);
    this.io.to(message.sessionId).emit(EventName.SESSION_LEAVED, { userId: client.id, userAlias: message.userAlias });
  }
}
