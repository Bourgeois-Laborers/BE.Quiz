import { Module } from '@nestjs/common';

import { PrometheusService } from '@prometheus/prometheus.service';
import { PrometheusController } from '@prometheus/prometheus.controller';

@Module({
  providers: [PrometheusService],
  controllers: [PrometheusController],
})
export class PrometheusModule {}
