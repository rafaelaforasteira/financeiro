# Ledger — preparação

Há somente validação pura de partidas compensadas em `packages/domain`: mesma titularidade, moeda BRL, valor inteiro bigint, contas distintas e soma zero. Não existe diário persistido, posting service, autorização financeira, deduplicação ou lock de saldo neste marco.

Próxima entrega: journal append-only, accounts/postings, unique de idempotência por escopo, transação PostgreSQL, locks determinísticos, outbox atômica, trigger de integridade diferida e reversões compensatórias. Não habilitar depósitos ou resgates antes dos testes reais de concorrência, isolamento e rollback.
