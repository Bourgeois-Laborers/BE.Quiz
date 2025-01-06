import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as client from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly register: client.Registry;

  constructor(private readonly configService: ConfigService) {
    this.register = new client.Registry();
    this.register.setDefaultLabels({ app: this.configService.getOrThrow('PROMETHEUS_LABEL') });
    client.collectDefaultMetrics({ register: this.register });
  }

  getMetrics(): Promise<string> {
    return this.register.metrics();
  }
}
