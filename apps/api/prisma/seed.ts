import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';
import { assertDemoEnvironment } from '@financeiro/domain';
config({ path: '../../.env', quiet: true });
assertDemoEnvironment(process.env);
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});
async function seed() {
  // Sem conta de login ou senha conhecida: autenticação será implementada no próximo marco.
  await prisma.profile.upsert({
    where: { id: '00000000-0000-4000-8000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-4000-8000-000000000001',
      name: 'Perfil sintético de desenvolvimento',
      type: 'CPF',
    },
  });
  console.info(
    'Seed demonstrativo concluído; nenhum usuário ou dinheiro real criado.',
  );
}
seed()
  .catch(() => {
    console.error('Falha no seed demonstrativo.');
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
