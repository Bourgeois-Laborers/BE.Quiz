import { Test, TestingModule } from '@nestjs/testing';

import { Response } from 'express';

import { PrometheusController } from '@prometheus/prometheus.controller';
import { PrometheusService } from '@prometheus/prometheus.service';

describe('PrometheusController', () => {
  let controller: PrometheusController;
  let prometheusService: jest.Mocked<PrometheusService>;

  let mockResponse: Partial<Response>;

  beforeEach(async () => {
    const mockPrometheusService = {
      getMetrics: jest.fn(),
    };

    mockResponse = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrometheusController],
      providers: [
        {
          provide: PrometheusService,
          useValue: mockPrometheusService,
        },
      ],
    }).compile();

    controller = module.get<PrometheusController>(PrometheusController);
    prometheusService = module.get<PrometheusService>(PrometheusService) as jest.Mocked<PrometheusService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMetrics', () => {
    it('should call prometheusService.getMetrics and send the metrics with correct headers', async () => {
      const mockMetrics = 'mocked metrics string';
      prometheusService.getMetrics.mockResolvedValue(mockMetrics);

      await controller.getMetrics(mockResponse as Response);

      expect(prometheusService.getMetrics).toHaveBeenCalledTimes(1);

      expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');

      expect(mockResponse.send).toHaveBeenCalledWith(mockMetrics);
    });

    it('should handle errors when prometheusService.getMetrics throws an error', async () => {
      const mockError = new Error('Failed to get metrics');
      prometheusService.getMetrics.mockRejectedValueOnce(mockError);

      await expect(controller.getMetrics(mockResponse as Response)).rejects.toThrow('Failed to get metrics');

      expect(mockResponse.setHeader).not.toHaveBeenCalled();
      expect(mockResponse.send).not.toHaveBeenCalled();
    });
  });
});
