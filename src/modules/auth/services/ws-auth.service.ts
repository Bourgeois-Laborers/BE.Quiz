import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { ITokenPayload } from './interfaces/auth.interface';
import { IWsAuthService } from './interfaces/ws-auth.service.interface';

@Injectable()
export class WsAuthService implements IWsAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  validateSocketConnection(socket: Socket): void {
    try {
      const token = socket.handshake.query.token as string;

      if (!token) {
        throw new WsException('Authentication error: No token provided');
      }

      const jwtSecret = this.configService.getOrThrow<string>(
        'jwt.accessToken.secret',
      );

      const user = this.jwtService.verify<ITokenPayload>(token, {
        secret: jwtSecret,
      });

      if (!user) {
        throw new WsException('Authentication error: Invalid token');
      }

      (socket.data as { user?: ITokenPayload }).user = user;
    } catch (error) {
      if (error instanceof WsException) {
        throw error;
      }
      throw new WsException('Authentication error: Invalid token');
    }
  }
}
