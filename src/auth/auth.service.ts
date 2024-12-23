import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LogicException } from '@common/exceptions/logic-exception';
import { LogicExceptionList } from '@common/types/logic-exceptions.enum';
import { AuthorizedUser } from '@common/interfaces/user.inteface';

import { User } from '@database/entities/user.entity';
import { UsersRepository } from '@database/repositories/user.repository';

import { SignUpProps } from './interfaces/sign-up.interface';
import { SignInProps } from './interfaces/sign-in.interface';
import { RefreshTokenProps } from './interfaces/refresh-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpProps): Promise<{ accessToken: string; refreshToken: string }> {
    const { username } = signUpDto;

    const isUserExist = await this.usersRepository.findOne({ username });

    if (isUserExist) {
      throw new LogicException(LogicExceptionList.USER_ALREADY_EXISTS);
    }

    const newUser = new User();
    newUser.username = username;
    const createdUser = await this.usersRepository.create(newUser);

    return this.generateTokens(createdUser);
  }

  async signIn(signInDto: SignInProps): Promise<{ accessToken: string; refreshToken: string }> {
    const { username } = signInDto;

    const user = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new LogicException(LogicExceptionList.USER_NOT_FOUND);
    }

    return this.generateTokens(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenProps): Promise<{ accessToken: string; refreshToken: string }> {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = await this.jwtService.verifyAsync<AuthorizedUser>(refreshToken);
      const user = await this.usersRepository.findOne({ id: payload.sub });

      if (!user) {
        throw new LogicException(LogicExceptionList.USER_NOT_FOUND);
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new LogicException(LogicExceptionList.AUTH_INVALID_TOKEN);
    }
  }

  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '1d' });

    return { accessToken, refreshToken };
  }
}
