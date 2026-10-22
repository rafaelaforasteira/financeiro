import { z } from 'zod';

export const centsSchema = z.string().regex(/^(0|[1-9]\d*)$/);
export const profileSchema = z.object({
  id: z.enum(['pessoal', 'empresa']),
  name: z.string(),
  type: z.enum(['CPF', 'CNPJ']),
});
export const demoSnapshotSchema = z.object({
  mode: z.literal('DEMO'),
  source: z.literal('PUBLIC_SYNTHETIC_FIXTURE'),
  asOf: z.string().datetime(),
  profile: profileSchema,
  balance: z.object({
    total: centsSchema,
    available: centsSchema,
    locked: centsSchema,
    pending: centsSchema,
    inVaults: centsSchema,
  }),
  vaults: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      kind: z.enum(['FREE', 'FIXED']),
      balance: centsSchema,
      goal: centsSchema.nullable(),
      unlockAt: z.string().datetime().nullable(),
    }),
  ),
  activity: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      amount: centsSchema,
      state: z.enum(['PENDING', 'SETTLED']),
      createdAt: z.string().datetime(),
    }),
  ),
  capabilities: z.object({
    deposits: z.literal(false),
    withdrawals: z.literal(false),
    createVault: z.literal(false),
    realMoney: z.literal(false),
  }),
});
export type DemoSnapshot = z.infer<typeof demoSnapshotSchema>;
export type DemoProfile = DemoSnapshot['profile'];

export function formatMoney(cents: string | bigint): string {
  const value = BigInt(cents);
  const sign = value < 0n ? '-' : '';
  const absolute = value < 0n ? -value : value;
  return `${sign}R$ ${(absolute / 100n).toLocaleString('pt-BR')},${(absolute % 100n).toString().padStart(2, '0')}`;
}
