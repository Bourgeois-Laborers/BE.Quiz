import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

export const ISessionGateway = Symbol('ISessionGateway');

export interface ISessionGateway
  extends OnGatewayConnection,
    OnGatewayDisconnect {
  broadcastToSession(sessionId: string, event: string, data: unknown): void;
}
