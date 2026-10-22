import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { Pool } from 'pg';
import Redis from 'ioredis';

@Controller('health')
export class HealthController {
  @Get('live') live() {
    return { status: 'ok', mode: 'DEMO', realMoney: false };
  }
  @Get('ready') async ready() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 1500,
      max: 1,
    });
    const redis = new Redis(process.env.REDIS_URL ?? 'redis://127.0.0.1:6379', {
      lazyConnect: true,
      connectTimeout: 1500,
      maxRetriesPerRequest: 0,
      retryStrategy: () => null,
    });
    redis.on('error', () => undefined);
    const checks = await Promise.allSettled([
      pool.query('SELECT 1'),
      redis.ping(),
    ]);
    redis.disconnect();
    await pool.end();
    const dependencies = {
      postgres: checks[0].status === 'fulfilled',
      redis: checks[1].status === 'fulfilled',
    };
    if (!dependencies.postgres || !dependencies.redis)
      throw new ServiceUnavailableException({
        status: 'unavailable',
        dependencies,
      });
    return { status: 'ready', mode: 'DEMO', dependencies };
  }
}
