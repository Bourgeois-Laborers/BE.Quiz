const setDefaultLabelsMock = jest.fn();
const metricsMock = jest.fn().mockResolvedValue('mocked metrics string');
const collectDefaultMetricsMock = jest.fn();

import { Test, TestingModule } from '@nestjs/testing';
import { PrometheusService } from '@prometheus/prometheus.service';
import { Registry } from 'prom-client';

class MockRegistry {
  setDefaultLabels = setDefaultLabelsMock;
  metrics = metricsMock;
}

jest.mock('prom-client', () => ({
  Registry: jest.fn(() => new MockRegistry()),
  collectDefaultMetrics: collectDefaultMetricsMock,
}));

describe('PrometheusService', () => {
  let service: PrometheusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrometheusService],
    }).compile();

    service = module.get<PrometheusService>(PrometheusService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('constructor', () => {
    it('should initialize prom-client.Registry and set default labels', () => {
      expect(Registry).toHaveBeenCalledTimes(1);

      expect(setDefaultLabelsMock).toHaveBeenCalledWith({ app: 'quiz-prometheus' });

      expect(collectDefaultMetricsMock).toHaveBeenCalledWith({ register: expect.any(Object) });
    });
  });

  describe('getMetrics', () => {
    it('should return metrics as a string', async () => {
      const metrics = await service.getMetrics();

      expect(metricsMock).toHaveBeenCalledTimes(1);

      expect(metrics).toBe('mocked metrics string');
    });

    it('should handle errors when retrieving metrics', async () => {
      const mockError = new Error('Failed to get metrics');
      metricsMock.mockRejectedValueOnce(mockError);

      await expect(service.getMetrics()).rejects.toThrow('Failed to get metrics');

      expect(metricsMock).toHaveBeenCalledTimes(1);
    });
  });
});
