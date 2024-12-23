import { Injectable } from '@nestjs/common';

import { LogicException } from '@common/exceptions/logic-exception';
import { LogicExceptionList } from '@common/types/logic-exceptions.enum';

import { User } from '@database/entities/user.entity';
import { UsersRepository } from '@database/repositories/user.repository';

import { CreateUserProps } from './interfaces/create-user.interface';
import { UpdateUserProps } from './interfaces/update-user.interface';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserProps): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;

    const existingUser = await this.usersRepository.findOne({ username: createUserDto.username });
    if (existingUser) {
      throw new LogicException(LogicExceptionList.USER_ALREADY_EXISTS);
    }

    return this.usersRepository.create(user);
  }

  async update(id: string, updateUserDto: UpdateUserProps): Promise<User> {
    const user = await this.usersRepository.findOne({ id });

    if (!user) {
      throw new LogicException(LogicExceptionList.USER_NOT_FOUND);
    }

    user.username = updateUserDto.username;

    return this.usersRepository.update(user);
  }

  async delete(userId: string): Promise<User> {
    await this.usersRepository.delete(userId);

    return null;
  }
}
