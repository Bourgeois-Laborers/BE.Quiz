import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { IUserService } from './interfaces/user.service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create() {
    const user = await this.userRepository.create();
    const accessToken = await this.jwtService.signAsync({ id: user.id });

    return { accessToken, id: user.id };
  }

  async get(id: string) {
    return this.userRepository.get(id);
  }
}
