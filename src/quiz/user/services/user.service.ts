import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { IUserService } from './interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create() {
    return this.userRepository.create();
  }
}
