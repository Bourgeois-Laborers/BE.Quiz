import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../database/entities/user.entity';
import { UsersRepository } from '../database/repositories/user.repository';

import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

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
      throw new Error('Username already in use');
    }

    const newUser = new User();
    newUser.username = username;
    const createdUser = await this.usersRepository.create(newUser);

    return this.signIn({ username: createdUser.username });
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { username } = signInDto;

    const user = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
