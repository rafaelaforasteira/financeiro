import { Injectable, NotFoundException } from '@nestjs/common';
import { demoSnapshotSchema, type DemoProfile } from '@financeiro/contracts';

// Catálogo público de cenários de interface. Nunca consultar tabelas de clientes aqui.
const profiles: DemoProfile[] = [
  { id: 'pessoal', name: 'Pessoa exemplo', type: 'CPF' },
  { id: 'empresa', name: 'Empresa exemplo', type: 'CNPJ' },
];
@Injectable()
export class DemoService {
  profiles() {
    return profiles.map((profile) => ({ ...profile }));
  }
  snapshot(id: string) {
    const profile = profiles.find((profile) => profile.id === id);
    if (!profile)
      throw new NotFoundException('Cenário demonstrativo não encontrado.');
    const personal = id === 'pessoal';
    return demoSnapshotSchema.parse({
      mode: 'DEMO',
      source: 'PUBLIC_SYNTHETIC_FIXTURE',
      asOf: '2026-10-22T12:00:00.000Z',
      profile,
      balance: personal
        ? {
            total: '1248050',
            available: '500000',
            locked: '748050',
            pending: '20000',
            inVaults: '928050',
          }
        : {
            total: '0',
            available: '0',
            locked: '0',
            pending: '0',
            inVaults: '0',
          },
      vaults: personal
        ? [
            {
              id: 'viagem',
              name: 'Próxima viagem',
              kind: 'FREE',
              balance: '180000',
              goal: '500000',
              unlockAt: null,
            },
            {
              id: 'futuro',
              name: 'Planos para o futuro',
              kind: 'FIXED',
              balance: '748050',
              goal: '1500000',
              unlockAt: '2026-12-15T12:00:00.000Z',
            },
          ]
        : [],
      activity: personal
        ? [
            {
              id: 'pendente',
              label: 'Depósito demonstrativo',
              amount: '20000',
              state: 'PENDING',
              createdAt: '2026-10-22T12:00:00.000Z',
            },
            {
              id: 'aporte',
              label: 'Valor guardado em Próxima viagem',
              amount: '30000',
              state: 'SETTLED',
              createdAt: '2026-10-21T14:00:00.000Z',
            },
          ]
        : [],
      capabilities: {
        deposits: false,
        withdrawals: false,
        createVault: false,
        realMoney: false,
      },
    });
  }
}
