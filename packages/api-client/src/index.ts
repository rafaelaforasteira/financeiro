import { demoSnapshotSchema, type DemoProfile } from '@financeiro/contracts';

export async function getDemoSnapshot(
  baseUrl: string,
  profile: DemoProfile['id'],
  signal?: AbortSignal,
) {
  const response = await fetch(
    `${baseUrl}/v1/demo/profiles/${profile}/snapshot`,
    {
      signal: signal ?? AbortSignal.timeout(8000),
      cache: 'no-store',
    },
  );
  if (!response.ok)
    throw new Error('Não conseguimos atualizar os dados. Tente novamente.');
  return demoSnapshotSchema.parse(await response.json());
}
