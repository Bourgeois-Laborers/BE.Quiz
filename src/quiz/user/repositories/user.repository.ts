import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';

import { IUser, IUserRepository } from './interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(): Promise<IUser> {
    const userId = uuidv7();

    return this.prismaService.userTable.create({
      data: { id: userId },
    });
  }

  async get(userId: string): Promise<IUser | null> {
    return await this.prismaService.userTable.findFirst({
      where: { id: userId },
    });
  }
}
