import { ITokenUser } from '@auth/interfaces/auth.interface';

declare namespace Express {
  export interface Request {
    user?: ITokenUser;
  }
}
