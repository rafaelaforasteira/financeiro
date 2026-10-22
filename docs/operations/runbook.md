# Runbook local

1. API fora: consultar saída do processo e variáveis de `.env`; `health/live` confirma processo apenas.
2. Readiness 503: verificar Docker Desktop e health dos containers; não tratar falha como saldo zero.
3. Worker sem ready: verificar Redis. Não há ordens financeiras para reenviar neste marco.
4. Web sem dados: confirmar API na porta 4000; usar Tentar novamente. Não há fallback silencioso para dados financeiros.
5. Suspeita de segredo: interromper compartilhamento, revogar/rotacionar credencial pelo serviço responsável e investigar histórico. Não imprimir segredo em issue/log.

Não há recuperação bancária, conciliação, backup restaurado ou operação de produção homologada. Nenhum dado de cliente deve entrar no ambiente local.
