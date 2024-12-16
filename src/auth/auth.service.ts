import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../database/entities/user.entity';
import { UsersRepository } from '../database/repositories/user.repository';

import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string }> {
    const { username } = signUpDto;

    const isUserExist = await this.usersRepository.findOne({ username });

    if (isUserExist) {
      throw new BadRequestException('Username already in use');
    }

    const newUser = new User();
    newUser.username = username;
    const createdUser = await this.usersRepository.create(newUser);

    const payload = { sub: createdUser.id, username: createdUser.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
