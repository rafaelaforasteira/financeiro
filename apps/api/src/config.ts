import { config } from 'dotenv';
import { assertDemoEnvironment } from '@financeiro/domain';

config({ path: '../../.env', quiet: true });
export function validateEnvironment() {
  assertDemoEnvironment(process.env);
  const port = Number(process.env.API_PORT ?? '4000');
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error('INVALID_API_PORT');
  return {
    port,
    origins: (process.env.CORS_ORIGINS ?? '').split(',').filter(Boolean),
  };
}
