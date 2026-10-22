# APP FINANCEIRO

Aplicativo de organização e acumulação patrimonial para CPF/CNPJ. **Desenvolvimento demonstrativo; sem dinheiro real.**

## Estado desta entrega

Fundação do monorepositório e primeira experiência de consulta. Web e mobile consomem cenários públicos sintéticos da mesma API NestJS. Há navegação, troca de cenário CPF/CNPJ, privacidade de valores, cofres e detalhes, estados vazios/erro e atividade ilustrativa. O admin mostra apenas disponibilidade técnica pública. Não há conta de cliente, autenticação, KYC ou operação financeira implementada neste marco.

Os valores não vêm do PostgreSQL: são fixtures públicas no módulo `demo`. **Isso não constitui isolamento autenticado nem ledger persistente.** O esquema e a migração inicial preparam usuários, memberships, perfis e cofres para o próximo marco. Regras puras testadas não substituem transações de banco ou controles financeiros.

## Requisitos e instalação

Node 24 LTS, pnpm 9.15.4, Docker Desktop em execução para PostgreSQL/Redis. Dependências exatas resolvidas no lockfile. Expo SDK 58/React Native 0.88/React 19.3; Next 16.4; Nest 12; Prisma **7.10.1 estável**, escolhido porque `latest` apontava para 8 RC na inspeção.

```powershell
pnpm install --frozen-lockfile
Copy-Item .env.example .env
pnpm infra:up
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Web: http://localhost:3000 · Admin: http://localhost:3001 · API: http://127.0.0.1:4000/v1/health/live. `pnpm dev` inicia web, admin, API e worker. O mobile roda separadamente:

```powershell
pnpm --filter @financeiro/mobile dev
```

Escaneie o QR pelo Expo Go compatível com SDK 58. Android/iOS exigem ambiente ou dispositivo compatível; builds nativos não foram presumidos por haver bundle compilado. Para emulador Android, a URL da API pode usar `10.0.2.2`. A API escuta somente loopback por padrão; conexão de dispositivo físico exige configuração explícita de host, firewall e URL em rede local. Não expor o servidor à internet.

Copie `EXPO_PUBLIC_API_URL` para `apps/mobile/.env.local` se precisar mudar a URL. Next usa proxy de mesma origem e `API_URL` privado (padrão local). Variáveis de API/worker/Prisma são lidas de `.env` na raiz pelos scripts de workspace.

## Comandos

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
pnpm format:check
```

`build` inclui exportação Expo Android/iOS/web; exportação não é binário de loja. `db:migrate` aplica migrações versionadas; `db:seed` é idempotente e cria apenas um perfil sintético sem login. Nunca executar seed contra ambiente real.

`test:integration` exige PostgreSQL/Redis, migração/seed aplicados e worker ativo. Verifica a proteção de meta no banco com rollback e um job técnico real no worker separado.

Para iniciar individualmente: `pnpm --filter @financeiro/api dev`, `pnpm --filter @financeiro/worker dev`, `pnpm --filter @financeiro/web dev`, `pnpm --filter @financeiro/admin dev`.

## Organização

- `apps/mobile`: Expo Router, telas nativas e componentes Expo UI.
- `apps/web` e `apps/admin`: Next.js, cliente e superfície técnica administrativa separada.
- `apps/api`: NestJS modular, catálogo demonstrativo e verificações de saúde.
- `apps/worker`: BullMQ, somente fila técnica `demo-system-health`/job `ping`.
- `packages/contracts`, `api-client`, `design-tokens`, `ui`, `domain`: contratos validados, comunicação, identidade visual e regras puras.
- `infra/local`: PostgreSQL e Redis vinculados a loopback, volumes persistentes.
- `docs`: arquitetura, execução, limitações, evidências e continuidade.

## Segurança e dependências externas

API e worker recusam iniciar sem `APP_MODE=DEMO`, `ENABLE_REAL_MONEY=false` e `NODE_ENV=development|test`. A API disponibiliza apenas leitura de fixtures públicas; nenhum endpoint privado ou financeiro é exposto. Não existe login administrativo alternativo. Headers, CORS restritivo, limite de requisições e request IDs estão presentes. Segurança de produção, sessões, autorização por membership, antifraude e auditoria persistida continuam pendentes.

Dados financeiros reais dependem de instituição regulada contratada, homologação e aprovação operacional. Sem Pix, rendimento, cartão, boleto ou transferências entre titulares. Recomenda-se tornar o repositório privado antes de adicionar código sensível; a visibilidade não é alterada por esta entrega.

Consulte [status e continuidade](docs/development/implementation-status.md) para o que foi efetivamente verificado. Não há licença comercial do projeto definida; o arquivo `apps/mobile/LICENSE` preserva a licença do template Expo utilizado.
