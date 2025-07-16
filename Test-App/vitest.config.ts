import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./Tests/setup.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/app.spec.ts'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});