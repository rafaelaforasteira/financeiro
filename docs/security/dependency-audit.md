# Auditoria de dependências — 22/10/2026

`pnpm audit --audit-level high` retornou código 1: duas vulnerabilidades altas e uma baixa. Não foram adicionadas exceções nem removido o check da CI.

- [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv): node-forge <=1.4.0, verificação RSA PKCS#1. Registro sem versão corrigida. Dependência transitiva do CLI/certificados de assinatura Expo.
- [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): braces <=3.0.3, exaustão da pilha em padrões profundamente aninhados. Registro sem versão corrigida. Dependência transitiva de micromatch/Metro e ferramentas de compilação.

Versões estáveis mais recentes consultadas continuam afetadas. Não aplicar downgrade arbitrário, patch criptográfico improvisado ou supressão para obter resultado verde. Nesta entrega nenhuma função financeira aceita certificados ou padrões de glob do usuário, mas isso não é comprovação de ausência de exploração no tooling. Manter ambiente local, não aceitar projetos/assets não confiáveis nem publicar serviço financeiro. Bloqueio de aprovação de release até atualização ou mitigação revisada e testada. O check da CI deverá falhar enquanto os alertas persistirem.

Alerta baixo: [GHSA-g7r4-m6w7-qqqr](https://github.com/advisories/GHSA-g7r4-m6w7-qqqr), esbuild e leitura arbitrária de arquivos em servidor de desenvolvimento no Windows. A aplicação não usa o servidor HTTP do esbuild; não publicar ferramentas de desenvolvimento. Reexecutar `pnpm audit --json` antes do próximo marco. Esta análise não é auditoria de segurança independente.
