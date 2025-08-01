import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketRegistryService {
  private readonly clients = new Map<string, Socket>();

  addClient(socketId: string, socket: Socket) {
    this.clients.set(socketId, socket);
  }

  removeClient(socketId: string) {
    this.clients.delete(socketId);
  }

  getClient(socketId: string) {
    return this.clients.get(socketId);
  }

  getAllClients() {
    return Array.from(this.clients.entries());
  }
}
