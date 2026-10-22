import { describe, expect, it } from 'vitest';
import {
  assertDemoEnvironment,
  assertSameOwner,
  increaseGoal,
  transition,
  validateJournal,
  type Posting,
} from './index';

describe('regras financeiras puras — não representam persistência ou homologação', () => {
  it('meta pode aumentar, mas não diminuir ou zerar', () => {
    expect(increaseGoal(500000n, 600000n)).toBe(600000n);
    expect(() => increaseGoal(500000n, 499999n)).toThrow(
      'GOAL_CANNOT_DECREASE',
    );
    expect(() => increaseGoal(null, 0n)).toThrow();
  });
  it('impede movimentação entre CPF e CNPJ, mesmo do mesmo login', () => {
    expect(() => assertSameOwner('cpf-1', 'cnpj-1')).toThrow(
      'OWNERSHIP_MISMATCH',
    );
  });
  it('rejeita liquidação fora de ordem e liquidação duplicada', () => {
    expect(transition('PROCESSING', 'SETTLED')).toBe('SETTLED');
    expect(() => transition('CREATED', 'SETTLED')).toThrow();
    expect(() => transition('SETTLED', 'SETTLED')).toThrow();
  });
  it('exige partidas compensadas, contas distintas e mesma titularidade', () => {
    const postings: Posting[] = [
      {
        accountId: 'principal',
        profileId: 'cpf-1',
        currency: 'BRL',
        amount: -20000n,
      },
      {
        accountId: 'cofre',
        profileId: 'cpf-1',
        currency: 'BRL',
        amount: 20000n,
      },
    ];
    expect(() => validateJournal(postings)).not.toThrow();
    expect(() =>
      validateJournal([{ ...postings[0]!, amount: -19999n }, postings[1]!]),
    ).toThrow();
    expect(() =>
      validateJournal([postings[0]!, { ...postings[1]!, profileId: 'cnpj-1' }]),
    ).toThrow();
  });
  it.each([
    { NODE_ENV: 'production', APP_MODE: 'DEMO', ENABLE_REAL_MONEY: 'false' },
    { NODE_ENV: 'development', APP_MODE: 'LIVE', ENABLE_REAL_MONEY: 'false' },
    { NODE_ENV: 'development', APP_MODE: 'DEMO', ENABLE_REAL_MONEY: 'true' },
    {},
  ])('nega configuração insegura: %j', (env) =>
    expect(() => assertDemoEnvironment(env)).toThrow(),
  );
  it('aceita somente combinação explícita de desenvolvimento demonstrativo', () => {
    expect(() =>
      assertDemoEnvironment({
        NODE_ENV: 'development',
        APP_MODE: 'DEMO',
        ENABLE_REAL_MONEY: 'false',
      }),
    ).not.toThrow();
  });
});
