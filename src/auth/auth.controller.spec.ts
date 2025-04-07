import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            refreshToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signUp', () => {
    it('should call AuthService.signUp and return tokens', async () => {
      const mockResponse = { accessToken: 'access-token', refreshToken: 'refresh-token' };
      jest.spyOn(authService, 'signUp').mockResolvedValue(mockResponse);

      const result = await authController.signUp();

      expect(authService.signUp).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('signIn', () => {
    it('should call AuthService.signIn with SignInDto and return tokens', async () => {
      const mockSignInDto: SignInDto = { id: 'test' };
      const mockResponse = { accessToken: 'access-token', refreshToken: 'refresh-token' };
      jest.spyOn(authService, 'signIn').mockResolvedValue(mockResponse);

      const result = await authController.signIn(mockSignInDto);

      expect(authService.signIn).toHaveBeenCalledWith(mockSignInDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('refreshToken', () => {
    it('should call AuthService.refreshToken with RefreshTokenDto and return tokens', async () => {
      const mockRefreshTokenDto: RefreshTokenDto = { refreshToken: 'refresh-token' };
      const mockResponse = { accessToken: 'access-token', refreshToken: 'new-refresh-token' };
      jest.spyOn(authService, 'refreshToken').mockResolvedValue(mockResponse);

      const result = await authController.refreshToken(mockRefreshTokenDto);

      expect(authService.refreshToken).toHaveBeenCalledWith(mockRefreshTokenDto);
      expect(result).toEqual(mockResponse);
    });
  });
});
