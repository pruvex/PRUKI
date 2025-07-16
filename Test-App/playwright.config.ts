
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html'], // Keep the HTML reporter for you
    ['json', { outputFile: 'test-results.json' }] // Add the JSON reporter for me
  ],
});
