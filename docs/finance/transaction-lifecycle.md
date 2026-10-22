# Ciclo de operação

Máquina pura inicial: CREATED → PROCESSING → SETTLED ou FAILED; CREATED → CANCELED; SETTLED → REVERSED. Eventos fora de ordem ou liquidação repetida são rejeitados pela função. Isso não constitui idempotência persistente.

As atividades da Home são fixtures sem intenção ou efeito financeiro. Próximo marco deverá persistir intenções, histórico de estados, reservas e correlação com diário. Worker atual somente responde a job técnico `ping`; completar um job jamais confirma dinheiro.
