import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  root: './',
  server: {
    port: 4444,
    watch: {
      ignored: [
        'node_modules',
        'dist',
        'build',
        'public',
        'package.json',
        'package-lock.json',
        'tsconfig.json',
        'vite.config.ts',
        'yarn.lock',
      ],
    },
  },
});
