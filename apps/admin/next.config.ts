import type { NextConfig } from 'next';
const config: NextConfig = {
  devIndicators: false,
  transpilePackages: [
    '@financeiro/ui',
    '@financeiro/contracts',
    '@financeiro/design-tokens',
  ],
  poweredByHeader: false,
};
export default config;
