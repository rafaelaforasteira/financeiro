import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  expect: { timeout: 15000 },
  testDir: './tests/e2e',
  fullyParallel: false,
  use: { baseURL: 'http://localhost:3000', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' },
    },
  ],
  webServer: [
    {
      command: 'pnpm --filter @financeiro/api dev',
      url: 'http://127.0.0.1:4000/v1/health/live',
      reuseExistingServer: !process.env.CI,
      env: { APP_MODE: 'DEMO', ENABLE_REAL_MONEY: 'false', NODE_ENV: 'test' },
      timeout: 120000,
    },
    {
      command: 'pnpm --filter @financeiro/web dev',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 180000,
    },
  ],
});
