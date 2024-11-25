import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../database/entities/user.entity';
import { UsersRepository } from '../database/repositories/user.repository';

import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const newUser = new User();
    newUser.username = signInDto.username;

    const createdUser = await this.usersRepository.create(newUser);

    const payload = { sub: createdUser.id, username: createdUser.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
