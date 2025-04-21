import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Run tests in sequence to reduce memory pressure
    pool: 'forks',
    // Increase test timeout for slower machines
    testTimeout: 10000,
    // Limit the number of workers
    maxWorkers: 1,
    // Increase heap size limit
    environmentOptions: {
      NODE_OPTIONS: '--max-old-space-size=4096',
    },
    // Enable coverage reporting
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
