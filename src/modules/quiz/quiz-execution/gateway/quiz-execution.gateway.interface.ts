import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

export const IQuizExecutionGateway = Symbol('IQuizExecutionGateway');

export interface IQuizExecutionGateway
  extends OnGatewayConnection,
    OnGatewayDisconnect {}
