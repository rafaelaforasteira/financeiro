import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DemoController } from './modules/demo/demo.controller';
import { DemoService } from './modules/demo/demo.service';
import { HealthController } from './modules/health/health.controller';

@Module({ controllers: [DemoController], providers: [DemoService] })
class DemoModule {}
@Module({
  imports: [DemoModule, ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }])],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
