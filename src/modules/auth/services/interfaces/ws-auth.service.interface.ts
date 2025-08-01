import { Socket } from 'socket.io';

export const IWsAuthService = Symbol('IWsAuthService');

export interface IWsAuthService {
  validateSocketConnection(socket: Socket): void;
}
