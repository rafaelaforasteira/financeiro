# Modelo de segurança — marco de fundação

Somente catálogo sintético público e diagnóstico. Nenhum recurso privado está exposto. Não substituir autorização por ID enviado pelo cliente. Cenários `pessoal`/`empresa` não são sessões nem KYC.

Startup exige DEMO explícito, dinheiro real false e ambiente development/test. API recusa produção mesmo que DEMO esteja ligado. CORS em lista, Helmet, rate limiting, respostas sem cache e request IDs gerados no servidor. Logs HTTP contêm somente método, status e request ID; não incluem headers, bodies ou documentos. Erros de startup são reduzidos para evitar conexão/segredo nos logs.

Antes de rotas privadas: hash de senha adequado, sessões revogáveis e rotativas, cookies seguros/HttpOnly na web, CSRF conforme uso de cookies, storage seguro em mobile, autorização por membership, RBAC separado para admin, validação e auditoria. Antes de dinheiro: integração regulada e homologação completa. Nenhum desses itens deve ser presumido implementado por existir schema de usuário.
