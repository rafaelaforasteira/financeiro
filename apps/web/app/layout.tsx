import type { ReactNode } from 'react';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@financeiro/ui/src/styles.css';
import { cssVariables } from '@financeiro/design-tokens';

export const metadata = {
  title: 'APP FINANCEIRO · Demonstração',
  description:
    'Organize seus planos. Ambiente de demonstração com dados fictícios.',
};
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <style>{`:root{${cssVariables}}`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
