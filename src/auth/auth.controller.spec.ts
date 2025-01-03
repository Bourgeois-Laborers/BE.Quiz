import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

import { CookieName } from '@common/types/cookie-name.enum';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { SignInDto } from './dto/sign-in.dto';

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
    it('should return accessToken and set refreshToken cookie', async () => {
      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;
      const result = { accessToken: 'testAccessToken', refreshToken: 'testRefreshToken' };
      jest.spyOn(authService, 'signUp').mockResolvedValue(result);

      const response = await authController.signUp(mockResponse);

      expect(response).toEqual({ accessToken: 'testAccessToken' });
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        CookieName.REFRESH_TOKEN,
        'testRefreshToken',
        expect.any(Object),
      );
    });
  });

  describe('signIn', () => {
    it('should return accessToken and set refreshToken cookie', async () => {
      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;
      const signInDto: SignInDto = { id: 'test' };
      const result = { accessToken: 'testAccessToken', refreshToken: 'testRefreshToken' };
      jest.spyOn(authService, 'signIn').mockResolvedValue(result);

      const response = await authController.signIn(signInDto, mockResponse);

      expect(response).toEqual({ accessToken: 'testAccessToken' });
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        CookieName.REFRESH_TOKEN,
        'testRefreshToken',
        expect.any(Object),
      );
    });
  });

  describe('refreshToken', () => {
    it('should return accessToken and set new refreshToken cookie', async () => {
      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;
      const result = { accessToken: 'testAccessToken', refreshToken: 'newTestRefreshToken' };
      jest.spyOn(authService, 'refreshToken').mockResolvedValue(result);

      const response = await authController.refreshToken('testRefreshToken', mockResponse);

      expect(response).toEqual({ accessToken: 'testAccessToken' });
      expect(mockResponse.cookie).toHaveBeenCalledWith('Refresh', 'newTestRefreshToken', expect.any(Object));
    });
  });
});
