import { config } from 'dotenv';
import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { assertDemoEnvironment } from '@financeiro/domain';

config({ path: '../../.env', quiet: true });
assertDemoEnvironment(process.env);
const connection = new Redis(
  process.env.REDIS_URL ?? 'redis://127.0.0.1:6379',
  { maxRetriesPerRequest: null },
);
connection.on('error', () =>
  console.error(JSON.stringify({ event: 'redis_unavailable', mode: 'DEMO' })),
);
const worker = new Worker(
  'demo-system-health',
  async (job) => {
    if (job.name !== 'ping') throw new Error('UNSUPPORTED_JOB');
    // Apenas diagnóstico técnico. Nenhuma confirmação financeira é produzida pela fila.
    return { status: 'ok', mode: 'DEMO' };
  },
  { connection, concurrency: 1 },
);
worker.on('ready', () =>
  console.info(
    JSON.stringify({ event: 'worker_ready', queue: 'demo-system-health' }),
  ),
);
worker.on('error', () =>
  console.error(JSON.stringify({ event: 'worker_error' })),
);
async function shutdown() {
  await worker.close();
  await connection.quit();
}
process.once('SIGTERM', () => void shutdown());
process.once('SIGINT', () => void shutdown());
