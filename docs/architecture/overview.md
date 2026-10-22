# Arquitetura executável

Next.js web/admin e Expo mobile consomem NestJS. Os apps compartilham contratos Zod e tokens. UI DOM permanece no pacote `ui`; componentes nativos estão no mobile, evitando misturar DOM e React Native. Backend é monólito modular; worker é processo separado. PostgreSQL é o banco transacional escolhido; Redis não é fonte de saldo.

Neste marco somente o módulo `demo` fornece dados: fixtures públicas, sintéticas, imutáveis e sem dados pessoais. Não há autenticação simulada disfarçada de autenticação real. `/demo/profiles` representa escolha de cenário, não seleção autorizada de titularidade. O próximo marco deverá introduzir módulos de identidade, autenticação e perfis privados com guards e memberships antes de qualquer escrita financeira.

Fontes consultadas em 22/10/2026: as três guias do [documento mestre](https://docs.google.com/document/d/1EH1OrxVexjPUk-9_ACv7Vff8SbxAo4K9xZ4mjqEVv7g/edit), repositório remoto sem refs e workspace sem arquivos. Nenhuma arquitetura anterior foi removida. Base aprovada: decisões 098–104. pnpm/Turbo, Expo, Next e ledger de partidas dobradas são escolhas técnicas compatíveis com as recomendações.

Compatibilidade consultada nas fontes oficiais: [Expo 58](https://docs.expo.dev/versions/v58.0.0/), [Next instalação](https://nextjs.org/docs/app/getting-started/installation), [Nest primeiros passos](https://docs.nestjs.com/first-steps), [Prisma 7 requisitos](https://www.prisma.io/docs/orm/v7/reference/system-requirements) e [Prisma Config](https://www.prisma.io/docs/orm/v7/reference/prisma-config-reference). Versões efetivas no lockfile.
