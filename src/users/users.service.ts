import { Injectable } from '@nestjs/common';

import { User } from '../database/entities/user.entity';
import { UsersRepository } from '../database/repositories/user.repository';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;

    return this.usersRepository.create(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new Error('User not found');
    }

    user.username = updateUserDto.username;

    return this.usersRepository.update(user);
  }

  async delete(userId: string): Promise<User> {
    await this.usersRepository.delete(userId);

    return null;
  }
}
