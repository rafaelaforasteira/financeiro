import { expect, it } from 'vitest';
import { DemoService } from './demo.service';

it('patrimônio não soma novamente os cofres nem libera depósitos pendentes', () => {
  const snapshot = new DemoService().snapshot('pessoal');
  expect(
    BigInt(snapshot.balance.available) + BigInt(snapshot.balance.locked),
  ).toBe(BigInt(snapshot.balance.total));
  expect(snapshot.balance.pending).toBe('20000');
  expect(snapshot.capabilities.realMoney).toBe(false);
});
it('cenários CPF/CNPJ são independentes e IDs desconhecidos são rejeitados', () => {
  const demo = new DemoService();
  expect(demo.snapshot('empresa').vaults).toHaveLength(0);
  expect(() => demo.snapshot('cliente-secreto')).toThrow();
});
