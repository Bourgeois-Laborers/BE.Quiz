import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { EventName } from '@common/types/event-name.enum';

@WebSocketGateway(80, { namespace: 'session', cors: { origin: '*' } })
export class SessionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io: Server;

  private readonly logger = new Logger(SessionGateway.name);

  private connectedSockets: Map<string, Socket> = new Map();

  afterInit(): void {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client ${client.id} connected`);
    this.connectedSockets.set(client.id, client);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client ${client.id} disconnected`);
    this.connectedSockets.delete(client.id);
  }

  @SubscribeMessage(EventName.SESSION_JOIN)
  async handleSessionJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: { sessionId: string; userId: string; userAlias: string },
  ): Promise<void> {
    this.logger.log(`Client ${client.id} joined session ${message.sessionId}`);
    await client.join(message.sessionId);
    this.io.to(message.sessionId).emit(EventName.SESSION_JOINED, { userId: client.id, userAlias: message.userAlias });
  }

  @SubscribeMessage(EventName.SESSION_LEAVE)
  async handleSessionLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: { sessionId: string; userId: string; userAlias: string },
  ): Promise<void> {
    this.logger.log(`Client ${client.id} leaved session ${message.sessionId}`);
    await client.leave(message.sessionId);
    this.io.to(message.sessionId).emit(EventName.SESSION_LEAVED, { userId: client.id, userAlias: message.userAlias });
  }

  public serverBroadcast(eventName: EventName, sessionId: string, payload: Record<string, unknown>): void {
    this.io.to(sessionId).emit(eventName, payload);
  }
}
