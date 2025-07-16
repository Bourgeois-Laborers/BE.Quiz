import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const accessToken = req.cookies?.accessToken as string;
    if (
      accessToken &&
      (await this.authService.verifyAccessToken(accessToken))
    ) {
      throw new ConflictException('Already authenticated');
    }

    return true;
  }
}
