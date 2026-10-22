# Design system inicial

Fonte de autoridade: guia Identidade Visual & Design System. Direção aprovada: branco/off-white, calma, clareza, acolhimento e sofisticação. Hexadecimais, fonte, raios e geometria continuam sendo propostas iniciais, implementadas sem promovê-las a decisões comerciais definitivas.

`packages/design-tokens/src/index.ts` é a origem de cores, espaçamento, raios, tipografia e motion. Variáveis CSS são geradas da mesma paleta para web/admin. Componentes DOM: Button (primário/secundário/textual), Card, VaultCard e Activity. Mobile usa Expo UI nos botões e wrappers nativos próprios. Não forçar tema escuro: escolha explícita do produto.

Plus Jakarta Sans distribuída localmente por Fontsource na web, evitando dependência de download no runtime. Mobile usa fonte do sistema até incorporação e verificação dos assets da mesma família. Essa diferença está registrada para refinamento.

Responsividade: navegação lateral desktop/barra inferior compacta; grids colapsam em uma coluna. Foco visível, labels, textos de status, diálogo nativo com Escape, valores ocultos fora do DOM/texto acessível e redução de movimento. Meta é WCAG 2.2 AA; não declarar certificação por estes controles iniciais. Personagens 3D são recurso futuro e não bloqueiam a fundação.
