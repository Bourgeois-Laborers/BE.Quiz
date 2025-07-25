import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as ms from 'ms';
import { StringValue } from 'ms';

import {
  IAuth,
  ITokenPayload,
  IAuthService,
} from './interfaces/auth.interface';

import { IUser } from '@/modules/user/services/interfaces/user.service.interface';
import { UserService } from '@/modules/user/services/user.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userId: string): Promise<IAuth> {
    const user = await this.userService.get(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload: ITokenPayload = { id: userId };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('jwt.accessToken.secret'),
      expiresIn: this.configService.getOrThrow<string>(
        'jwt.accessToken.expiresIn',
      ),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('jwt.refreshToken.secret'),
      expiresIn: this.configService.getOrThrow<string>(
        'jwt.refreshToken.expiresIn',
      ),
    });

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string): Promise<ITokenPayload> {
    return this.jwtService.verifyAsync<ITokenPayload>(token, {
      secret: this.configService.getOrThrow<string>('jwt.accessToken.secret'),
    });
  }

  async register(): Promise<{ user: IUser } & IAuth> {
    const user = await this.userService.create();
    const { accessToken, refreshToken } = await this.login(user.id);

    return { user, accessToken, refreshToken };
  }

  getAccessTokenMaxAgeMs(): number {
    const accessTokenExpiresIn = this.configService.getOrThrow<StringValue>(
      'jwt.accessToken.expiresIn',
    );
    return ms(accessTokenExpiresIn);
  }

  getRefreshTokenMaxAgeMs(): number {
    const refreshTokenExpiresIn = this.configService.getOrThrow<StringValue>(
      'jwt.refreshToken.expiresIn',
    );
    return ms(refreshTokenExpiresIn);
  }
}
