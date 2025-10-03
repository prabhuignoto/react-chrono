import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5555, // Must match playwright.integration.config.ts
    strictPort: true, // Fail if port is already in use
  },
  optimizeDeps: {
    // Don't pre-bundle react-chrono, use it as-is from node_modules
    exclude: ['react-chrono'],
  },
  build: {
    outDir: 'dist',
  },
});
