import { expect, it } from 'vitest';
import { centsSchema, formatMoney } from './index';
it('formata centavos sem converter inteiros grandes para ponto flutuante', () => {
  expect(formatMoney('900719925474099312')).toBe('R$ 9.007.199.254.740.993,12');
  expect(formatMoney('5')).toBe('R$ 0,05');
  expect(formatMoney(-105n)).toBe('-R$ 1,05');
});
it('contrato rejeita negativos, frações e notação exponencial', () => {
  for (const input of ['-1', '1.1', '1e3', '01'])
    expect(centsSchema.safeParse(input).success).toBe(false);
});
