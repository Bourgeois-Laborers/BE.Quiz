import { WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { IQuizExecutionGateway } from '@/modules/quiz/quiz-execution/gateway/quiz-execution.gateway.interface';
import { SOCKET_NAMESPACES } from '@/modules/socket/constants/socket.constants';
import { SocketRegistryService } from '@/modules/socket/services/socket-registry.service';

@WebSocketGateway(80, { namespace: SOCKET_NAMESPACES.QUIZ_EXECUTION })
export class QuizExecutionGateway implements IQuizExecutionGateway {
  constructor(private readonly socketRegistry: SocketRegistryService) {}

  handleConnection(client: Socket) {
    const user = (client.data as { user?: { id: string } })?.user;

    if (user && user.id) {
      this.socketRegistry.addClient(user.id, client);
    } else {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.socketRegistry.removeClient(client.id);
  }

  sendMessageToUser(userId: string, message: string) {
    const client = this.socketRegistry.getClient(userId);

    if (client) {
      client.send('message', message);
    }
  }
}
