import { Injectable } from '@nestjs/common';

import {
  ILoginProps,
  ITokenPayload,
  IAuthService,
} from './interfaces/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor() {}

  async login(props: ILoginProps): Promise<ITokenPayload> {
    // TODO:
  }
}
