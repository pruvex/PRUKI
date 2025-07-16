import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './Tests',
  testMatch: '**/*.spec.ts',
  timeout: 90 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['json', { outputFile: 'test-results.json' }]],
  use: {
    trace: 'on-first-retry',
  },
});