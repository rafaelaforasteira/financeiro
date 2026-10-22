import 'reflect-metadata';
import { randomUUID } from 'node:crypto';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import type { Request, Response, NextFunction } from 'express';
import { validateEnvironment } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const config = validateEnvironment();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(helmet());
  app.use((req: Request, res: Response, next: NextFunction) => {
    // ID gerado no servidor; não propagar conteúdo arbitrário recebido em headers.
    const requestId = randomUUID();
    res.setHeader('X-Request-Id', requestId);
    res.setHeader('Cache-Control', 'no-store');
    res.on('finish', () =>
      Logger.log(
        JSON.stringify({
          requestId,
          method: req.method,
          status: res.statusCode,
        }),
        'HTTP',
      ),
    );
    next();
  });
  app.enableCors({
    origin: config.origins,
    methods: ['GET'],
    credentials: false,
  });
  app.setGlobalPrefix('v1');
  app.enableShutdownHooks();
  await app.listen(config.port, '127.0.0.1');
}
bootstrap().catch(() => {
  Logger.error('Falha ao iniciar API: verifique ambiente e configuração.');
  process.exitCode = 1;
});
