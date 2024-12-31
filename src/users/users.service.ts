import { Injectable } from '@nestjs/common';

import { User } from '@database/entities/user.entity';
import { UsersRepository } from '@database/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(): Promise<User> {
    const user = new User();
    return this.usersRepository.create(user);
  }

  async delete(userId: string): Promise<User> {
    await this.usersRepository.delete(userId);
    return null;
  }
}
