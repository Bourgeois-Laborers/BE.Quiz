import { Injectable } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server, ServerOptions, Socket } from 'socket.io';

import { SOCKET_NAMESPACES } from './constants/socket.constants';

import { WsAuthService } from '@/modules/auth/services/ws-auth.service';

const namespaces = [
  SOCKET_NAMESPACES.QUIZ_EXECUTION,
  SOCKET_NAMESPACES.SESSION,
];

@Injectable()
export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  private wsAuthService: WsAuthService;

  setAuthService(wsAuthService: WsAuthService) {
    this.wsAuthService = wsAuthService;
  }

  async connectToRedis(redisUrl: string): Promise<void> {
    const pubClient = createClient({ url: redisUrl });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  override createIOServer(port: number, options?: ServerOptions): Server {
    const server = super.createIOServer(port, options) as Server;
    if (this.adapterConstructor) {
      server.adapter(this.adapterConstructor);
    }

    namespaces.forEach((namespace) => {
      server
        .of(namespace)
        .use((socket, next) => this.authMiddleware(socket, next));
    });

    return server;
  }

  private authMiddleware(socket: Socket, next: (err?: Error) => void) {
    try {
      this.wsAuthService.validateSocketConnection(socket);
      next();
    } catch (error) {
      next(error);
    }
  }
}
