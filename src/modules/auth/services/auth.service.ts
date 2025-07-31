import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as ms from 'ms';
import { StringValue } from 'ms';

import {
  IAuth,
  ITokenPayload,
  IAuthService,
} from './interfaces/auth.interface';

import { jwtConfig } from '@/config/jwt.config';
import { IUser } from '@/modules/user/services/interfaces/user.service.interface';
import { UserService } from '@/modules/user/services/user.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigService: ConfigType<typeof jwtConfig>,
  ) {}

  async login(userId: string): Promise<{ user: IUser } & IAuth> {
    const user = await this.userService.get(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload: ITokenPayload = { id: userId };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfigService.accessToken.secret,
      expiresIn: this.jwtConfigService.accessToken.expiresIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfigService.refreshToken.secret,
      expiresIn: this.jwtConfigService.refreshToken.expiresIn,
    });

    return { user, accessToken, refreshToken };
  }

  async verifyAccessToken(token: string): Promise<ITokenPayload> {
    return this.jwtService.verifyAsync<ITokenPayload>(token, {
      secret: this.jwtConfigService.accessToken.secret,
    });
  }

  async register(): Promise<{ user: IUser } & IAuth> {
    const user = await this.userService.create();
    const { accessToken, refreshToken } = await this.login(user.id);

    return { user, accessToken, refreshToken };
  }

  getAccessTokenMaxAgeMs(): number {
    return ms(this.jwtConfigService.accessToken.expiresIn as StringValue);
  }

  getRefreshTokenMaxAgeMs(): number {
    return ms(this.jwtConfigService.refreshToken.expiresIn as StringValue);
  }
}
