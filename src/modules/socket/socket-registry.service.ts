import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketRegistryService {
  private readonly clients = new Map<string, Record<string, any>>();

  addClient(socketId: string, meta: Record<string, any>) {
    this.clients.set(socketId, meta);
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
