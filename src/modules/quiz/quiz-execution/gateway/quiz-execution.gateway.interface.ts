import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

export const IQuizExecutionGatewayInterface = Symbol(
  'IQuizExecutionGatewayInterface',
);

export interface IQuizExecutionGatewayInterface
  extends OnGatewayConnection,
    OnGatewayDisconnect {}
