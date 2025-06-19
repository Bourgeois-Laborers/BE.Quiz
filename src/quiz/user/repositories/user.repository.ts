import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';
import {
  ICreateUser,
  IUserRepository,
} from './interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(): Promise<ICreateUser> {
    const sessionId = uuidv7();

    await this.prismaService.userTable.create({
      data: { id: sessionId },
    });

    return { id: sessionId };
  }
}
