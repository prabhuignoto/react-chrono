import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-chrono': resolve(__dirname, '../dist/index.esm.js'),
    },
  },
  server: {
    port: 3000,
  },
});
