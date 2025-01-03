import { Test, TestingModule } from '@nestjs/testing';
import {
  HealthCheckService,
  HealthCheckResult,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

import { HealthController } from '@health/health.controller';

const mockHealthCheckService: Partial<jest.Mocked<HealthCheckService>> = {
  check: jest.fn(),
};

const mockHttpHealthIndicator: Partial<jest.Mocked<HttpHealthIndicator>> = {
  pingCheck: jest.fn(),
};

const mockTypeOrmHealthIndicator: Partial<jest.Mocked<TypeOrmHealthIndicator>> = {
  pingCheck: jest.fn(),
};

const mockDiskHealthIndicator: Partial<jest.Mocked<DiskHealthIndicator>> = {
  checkStorage: jest.fn(),
};

const mockMemoryHealthIndicator: Partial<jest.Mocked<MemoryHealthIndicator>> = {
  checkHeap: jest.fn(),
  checkRSS: jest.fn(),
};

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: jest.Mocked<HealthCheckService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: mockHealthCheckService,
        },
        {
          provide: HttpHealthIndicator,
          useValue: mockHttpHealthIndicator,
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: mockTypeOrmHealthIndicator,
        },
        {
          provide: DiskHealthIndicator,
          useValue: mockDiskHealthIndicator,
        },
        {
          provide: MemoryHealthIndicator,
          useValue: mockMemoryHealthIndicator,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService) as jest.Mocked<HealthCheckService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should return a healthy status when all indicators are up', async () => {
      const mockHealthCheckResult: HealthCheckResult = {
        status: 'ok',
        info: {
          Network: { status: 'up' },
          database: { status: 'up' },
          storage: { status: 'up' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
        },
        error: {},
        details: {
          Network: { status: 'up' },
          database: { status: 'up' },
          storage: { status: 'up' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
        },
      };

      healthCheckService.check.mockResolvedValue(mockHealthCheckResult);

      const result = await controller.check();

      expect(healthCheckService.check).toHaveBeenCalledWith([
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
      ]);

      expect(result).toEqual(mockHealthCheckResult);
    });

    it('should return an error status if one of the indicators fails', async () => {
      const mockHealthCheckResult: HealthCheckResult = {
        status: 'error',
        info: {
          Network: { status: 'up' },
          database: { status: 'down', message: 'Database connection failed' },
          storage: { status: 'up' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
        },
        error: {
          database: {
            message: 'Database connection failed',
            status: 'down',
          },
        },
        details: {
          Network: { status: 'up' },
          database: { status: 'down', message: 'Database connection failed' },
          storage: { status: 'up' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
        },
      };

      healthCheckService.check.mockResolvedValue(mockHealthCheckResult);

      const result = await controller.check();

      expect(healthCheckService.check).toHaveBeenCalledWith([
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
      ]);

      expect(result).toEqual(mockHealthCheckResult);
    });
  });
});
