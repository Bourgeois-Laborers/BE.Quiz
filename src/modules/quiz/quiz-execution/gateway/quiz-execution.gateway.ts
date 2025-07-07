import { WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { IQuizExecutionGatewayInterface } from './quiz-execution.gateway.interface';

import { SocketRegistryService } from '@/modules/socket/socket-registry.service';

@WebSocketGateway(80, { namespace: '/quiz-execution' })
export class QuizExecutionGateway implements IQuizExecutionGatewayInterface {
  constructor(private readonly socketRegistry: SocketRegistryService) {}

  handleConnection(client: Socket) {
    this.socketRegistry.addClient(client.id, {});
  }

  handleDisconnect(client: Socket) {
    this.socketRegistry.removeClient(client.id);
  }
}
