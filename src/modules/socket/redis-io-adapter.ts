import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { WsException } from '@nestjs/websockets';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server, ServerOptions, Socket } from 'socket.io';

import { ITokenUser } from '@/modules/auth/interfaces/token-user.interface';

const namespaces = ['/quiz-execution'];

@Injectable()
export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  private jwtService: JwtService;
  private jwtSecret: string;

  setJwt(jwtService: JwtService, jwtSecret: string) {
    this.jwtService = jwtService;
    this.jwtSecret = jwtSecret;
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
        .use((socket, next) => this.jwtNamespaceMiddleware(socket, next));
    });

    return server;
  }

  private jwtNamespaceMiddleware(socket: Socket, next: (err?: Error) => void) {
    try {
      if (process.env.SKIP_AUTH && process.env.NODE_ENV === 'development') {
        (socket.data as { user?: ITokenUser }).user = {
          id: '21ca5037-f766-453d-8c7d-e36adaf68881',
        };

        next();
        return;
      }

      const token = socket.handshake.query.token as string;

      if (!token) {
        return next(new WsException('Authentication error: No token provided'));
      }

      const user = this.jwtService.verify<ITokenUser>(token, {
        secret: this.jwtSecret,
      });

      if (!user) {
        return next(new WsException('Authentication error: Invalid token'));
      }

      (socket.data as { user?: ITokenUser }).user = user;
      next();
    } catch {
      next(new WsException('Authentication error: Invalid token'));
    }
  }
}
