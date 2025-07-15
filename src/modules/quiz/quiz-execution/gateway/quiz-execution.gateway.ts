import { WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { IQuizExecutionGateway } from '@/modules/quiz/quiz-execution/gateway/quiz-execution.gateway.interface';
import { SocketRegistryService } from '@/modules/socket/socket-registry.service';

@WebSocketGateway(80, { namespace: '/quiz-execution' })
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
