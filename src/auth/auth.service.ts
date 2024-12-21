import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../database/entities/user.entity';
import { UsersRepository } from '../database/repositories/user.repository';

import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthorizedUser } from '@common/interfaces/user.inteface';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { username } = signUpDto;

    const isUserExist = await this.usersRepository.findOne({ username });

    if (isUserExist) {
      throw new Error('Username already in use');
    }

    const newUser = new User();
    newUser.username = username;
    const createdUser = await this.usersRepository.create(newUser);

    return this.generateTokens(createdUser);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { username } = signInDto;

    const user = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    return this.generateTokens(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = await this.jwtService.verifyAsync<AuthorizedUser>(refreshToken);
      const user = await this.usersRepository.findOne({ id: payload.sub });

      if (!user) {
        throw new Error('User not found');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '1d' });

    return { accessToken, refreshToken };
  }
}
