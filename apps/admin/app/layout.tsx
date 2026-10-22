import type { ReactNode } from 'react';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@financeiro/ui/src/styles.css';
import { cssVariables } from '@financeiro/design-tokens';
export const metadata = {
  title: 'Operações · APP FINANCEIRO DEMO',
  robots: { index: false, follow: false },
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
