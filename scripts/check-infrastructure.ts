import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { config } from 'dotenv';
import { Pool } from 'pg';
import Redis from 'ioredis';
import { Queue, QueueEvents } from 'bullmq';

config({ path: '.env', quiet: true });
if (
  process.env.APP_MODE !== 'DEMO' ||
  process.env.ENABLE_REAL_MONEY !== 'false'
)
  throw new Error('DEMO obrigatório');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 3000,
});
const redis = new Redis(process.env.REDIS_URL ?? 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null,
});
const queue = new Queue('demo-system-health', { connection: redis });
const eventConnection = redis.duplicate();
const events = new QueueEvents('demo-system-health', {
  connection: eventConnection,
});

async function check() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const id = randomUUID();
    await client.query(
      'INSERT INTO "Vault" (id, "profileId", name, "goalCents") VALUES ($1, $2, $3, $4)',
      [
        id,
        '00000000-0000-4000-8000-000000000001',
        'Teste sintético com rollback',
        '500000',
      ],
    );
    await client.query('UPDATE "Vault" SET "goalCents" = $1 WHERE id = $2', [
      '600000',
      id,
    ]);
    await client.query('SAVEPOINT reject_decrease');
    await assert.rejects(
      client.query('UPDATE "Vault" SET "goalCents" = $1 WHERE id = $2', [
        '499999',
        id,
      ]),
      /GOAL_CANNOT_DECREASE/,
    );
    await client.query('ROLLBACK TO SAVEPOINT reject_decrease');
    await client.query('SAVEPOINT reject_null');
    await assert.rejects(
      client.query('UPDATE "Vault" SET "goalCents" = NULL WHERE id = $1', [id]),
      /GOAL_CANNOT_DECREASE/,
    );
    await client.query('ROLLBACK TO SAVEPOINT reject_null');
    assert.equal(
      (
        await client.query(
          'SELECT "goalCents"::text FROM "Vault" WHERE id = $1',
          [id],
        )
      ).rows[0].goalCents,
      '600000',
    );
    console.info(
      'PASS: PostgreSQL rejeita redução/remoção de meta e preserva valor após rollback.',
    );
  } finally {
    await client.query('ROLLBACK');
    client.release();
  }
  await events.waitUntilReady();
  const job = await queue.add(
    'ping',
    {},
    { jobId: randomUUID(), removeOnComplete: true, removeOnFail: true },
  );
  const result = await job.waitUntilFinished(events, 15000);
  assert.deepEqual(result, { status: 'ok', mode: 'DEMO' });
  console.info(
    'PASS: worker separado processa ping real no Redis/BullMQ, sem efeito financeiro.',
  );
}
check()
  .catch((error) => {
    console.error(
      error instanceof Error ? error.message : 'Falha na integração',
    );
    process.exitCode = 1;
  })
  .finally(async () => {
    await events.close();
    await queue.close();
    eventConnection.disconnect();
    redis.disconnect();
    await pool.end();
  });
