import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LogicException } from '@common/exceptions/logic-exception';
import { LogicExceptionList } from '@common/types/logic-exceptions.enum';

import { AuthGuard } from './auth.guard';
import { AuthorizedUser } from '@common/interfaces/user.inteface';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    let mockContext: ExecutionContext;
    let mockRequest: { headers: Record<string, string>; user?: AuthorizedUser };

    beforeEach(() => {
      mockRequest = {
        headers: {},
      };
      mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as ExecutionContext;
    });

    it('should throw AUTH_MISSING_TOKEN when no authorization header', async () => {
      await expect(guard.canActivate(mockContext)).rejects.toThrow(
        new LogicException(LogicExceptionList.AUTH_MISSING_TOKEN),
      );
    });

    it('should throw AUTH_INVALID_TOKEN when JWT verification fails', async () => {
      mockRequest.headers.authorization = 'Bearer invalid-token';
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error();
      });

      await expect(guard.canActivate(mockContext)).rejects.toThrow(
        new LogicException(LogicExceptionList.AUTH_INVALID_TOKEN),
      );
    });

    it('should return true and set user in request when token is valid', async () => {
      const mockPayload = { sub: 'user-id' };
      mockRequest.headers.authorization = 'Bearer valid-token';
      jest.spyOn(jwtService, 'verify').mockReturnValue(mockPayload);

      const result = await guard.canActivate(mockContext);

      expect(result).toBe(true);
      expect(mockRequest.user).toEqual(mockPayload);
      expect(jwtService.verify).toHaveBeenCalledWith('valid-token');
    });
  });
});
