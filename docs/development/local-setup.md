# Ambiente local

Comandos completos no README. Docker Compose mantém PostgreSQL 17 e Redis 7 em loopback com volumes. Credenciais do compose são exclusivamente locais e públicas de demonstração.

`pnpm db:generate` gera cliente Prisma 7 em diretório ignorado. `pnpm db:migrate` usa migrate deploy, sem reset ou exclusão de dados. `pnpm db:seed` cria perfil sintético idempotente. `pnpm dev` não executa seed nem migração automaticamente.

`/v1/health/live` comprova processo. `/v1/health/ready` retorna 503 se PostgreSQL ou Redis não responderem. A prévia de leitura funciona com API mesmo sem banco, por ser explicitamente um catálogo de fixtures; isso não deve ser reaproveitado como fallback de saldo real.

Use Ctrl+C para encerrar processos. `docker compose -f infra/local/compose.yaml stop` para parar serviços preservando dados. Não usar remoção de volumes como procedimento de recuperação. Sem backup/restore homologado neste marco.
