import { Injectable } from '@nestjs/common';

import { ITokenPayload, IAuthService } from './interfaces/auth.interface';

import { UserService } from '@/modules/user/services/user.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly userService: UserService) {}

  async login(userId: string): Promise<ITokenPayload> {
    return { id: userId };
  }

  async validateUser(userId: string) {
    try {
      return await this.userService.get(userId);
    } catch {
      return null;
    }
  }
}
