import { Module } from '@nestjs/common';
import { HealthCheckController } from './interface/http/health-check.controller';

@Module({
  controllers: [HealthCheckController]
})
export class HealthCheckModule {}
