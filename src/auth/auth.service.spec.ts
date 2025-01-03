import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { LogicException } from '@common/exceptions/logic-exception';
import { LogicExceptionList } from '@common/types/logic-exceptions.enum';

import { User } from '@database/entities/user.entity';
import { UsersRepository } from '@database/repositories/user.repository';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: UsersRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signUp', () => {
    it('should create a new user and return tokens', async () => {
      const mockUser = { id: 'test-id' } as User;
      const mockTokens = { accessToken: 'access', refreshToken: 'refresh' };

      jest.spyOn(usersRepository, 'create').mockResolvedValue(mockUser);
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce(mockTokens.accessToken)
        .mockResolvedValueOnce(mockTokens.refreshToken);

      const result = await service.signUp();

      expect(result).toEqual(mockTokens);
      expect(usersRepository.create).toHaveBeenCalled();
    });
  });

  describe('signIn', () => {
    it('should return tokens for existing user', async () => {
      const mockUser = { id: 'test-id' } as User;
      const mockTokens = { accessToken: 'access', refreshToken: 'refresh' };

      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(mockUser);
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce(mockTokens.accessToken)
        .mockResolvedValueOnce(mockTokens.refreshToken);

      const result = await service.signIn({ id: 'test-id' });

      expect(result).toEqual(mockTokens);
      expect(usersRepository.findOne).toHaveBeenCalledWith({ id: 'test-id' });
    });

    it('should throw error if user not found', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);

      await expect(service.signIn({ id: 'test-id' })).rejects.toThrow(
        new LogicException(LogicExceptionList.USER_NOT_FOUND),
      );
    });
  });

  describe('refreshToken', () => {
    it('should return new tokens for valid refresh token', async () => {
      const mockUser = { id: 'test-id' } as User;
      const mockTokens = { accessToken: 'new-access', refreshToken: 'new-refresh' };
      const mockPayload = { sub: 'test-id' };

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(mockUser);
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce(mockTokens.accessToken)
        .mockResolvedValueOnce(mockTokens.refreshToken);

      const result = await service.refreshToken({ refreshToken: 'old-refresh' });

      expect(result).toEqual(mockTokens);
      expect(jwtService.verifyAsync).toHaveBeenCalledWith('old-refresh');
      expect(usersRepository.findOne).toHaveBeenCalledWith({ id: 'test-id' });
    });

    it('should throw error if refresh token is invalid', async () => {
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error());

      await expect(service.refreshToken({ refreshToken: 'invalid' })).rejects.toThrow(
        new LogicException(LogicExceptionList.AUTH_INVALID_TOKEN),
      );
    });

    it('should throw error if user not found during refresh', async () => {
      const mockPayload = { sub: 'test-id' };

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);

      await expect(service.refreshToken({ refreshToken: 'valid' })).rejects.toThrow(
        new LogicException(LogicExceptionList.AUTH_INVALID_TOKEN),
      );
    });
  });
});
