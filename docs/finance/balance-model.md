# Modelo de saldo

Transporte usa strings de centavos; regras puras usam bigint, nunca ponto flutuante. Apresentação formata pt-BR sem perder centavos de números grandes.

Na fixture, patrimônio = disponível + bloqueado. Saldo em cofres é uma classificação dentro desse total, e não deve ser somado novamente. Depósito pendente é externo ao total. Disponível inclui valores ilustrativos do saldo principal e Cofre Livre. Não existem rendimentos ou projeções creditados. Próximo marco deverá calcular categorias a partir do ledger persistido.
