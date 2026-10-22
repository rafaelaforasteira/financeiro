# Contribuição

Leia o documento mestre e `docs/development/implementation-status.md`. Trabalhe em branches curtas, preserve decisões 001–104 e mantenha recomendações 105–145 identificadas como recomendações. Use Conventional Commits e revise diffs antes de enviar.

Execute lint, typecheck, testes, build e verificações relacionadas à alteração. Não confunda testes de regras puras com integração financeira. Mudanças monetárias precisam de testes de concorrência, idempotência, titularidade, reversão e falhas transacionais antes de habilitar rotas de escrita.

Não versionar `.env`, documentos pessoais, chaves, extratos, dados de clientes ou credenciais. Não realizar merge automático na main ou publicar operações reais.
