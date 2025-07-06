import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from '../repositories/user.repository';
import { IUser, IUserService } from './interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async get(userId: string): Promise<IUser> {
    const user = await this.userRepository.get(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(): Promise<IUser> {
    return this.userRepository.create();
  }
}
