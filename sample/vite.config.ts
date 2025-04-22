import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import test from 'vite-plugin-test';

export default defineConfig({
  plugins: [react(), test()],
  resolve: {
    alias: {
      'react-chrono': resolve(__dirname, '../dist/index.esm.js'),
    },
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
