/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

// https://vitest.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Fast refresh for better development experience
      fastRefresh: true,
      
      // JSX runtime configuration
      jsxRuntime: 'automatic',
      
      // Babel configuration for styled-components
      babel: {
        plugins: [
          ['babel-plugin-styled-components', {
            displayName: true,
            fileName: true,
            pure: true,
          }],
        ],
      },
    }), 
    tsconfigPaths()
  ],
  
  test: {
    // Test environment
    environment: 'jsdom',
    
    // Global test setup
    globals: true,
    
    // Test files to include
    include: [
      './src/**/*.test.{tsx,ts}',
      './src/**/*.spec.{tsx,ts}',
      './src/**/__tests__/**/*.{tsx,ts}',
    ],
    
    // Test files to exclude
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/cypress/**',
      '**/public/**',
      '**/readme-assets/**',
      '**/demo/**',
      '**/examples/**',
    ],
    
    // Setup files
    setupFiles: ['./src/test-setup.js'],
    
    // Coverage configuration
    coverage: {
      // Enable coverage
      enabled: true,
      
      // Clean coverage directory before each run
      clean: true,
      
      // Coverage provider
      provider: 'v8',
      
      // Coverage reporters
      reporter: [
        'text',
        'text-summary',
        'lcov',
        'clover',
        'html',
        'json',
        'json-summary',
      ],
      
      // Coverage reports directory
      reportsDirectory: './coverage',
      
      // Coverage thresholds
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
      
      // Files to exclude from coverage
      exclude: [
        // Type definitions and configuration files
        '**/*.d.ts',
        '**/*.config.{js,ts,mjs}',
        '**/tsconfig.json',
        '**/eslintrc.js',
        '**/eslint.config.*',
        '**/.prettierrc',
        '**/postcss.config.js',
        '**/tailwind.config.js',
        '**/babel.config.js',
        '**/webpack.config.js',
        '**/rollup.config.*',
        '**/vite.config.*',
        '**/vitest.config.*',
        '**/cypress.config.*',

        // Build and cache directories
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/coverage/**',
        '**/cache/**',
        '**/test-build/**',
        '**/dist_site/**',

        // Documentation and assets
        '**/public/**',
        '**/readme-assets/**',
        '**/docs/**',

        // Test setup and configuration
        '**/test-setup.{js,ts}',
        '**/cypress/**',
        '**/test/**',

        // Source files that don't need coverage
        'src/components/index.tsx',
        'src/components/GlobalContext.tsx',
        'src/react-chrono.ts',
        'src/index.tsx',
        'src/demo/**',
        'src/examples/**',
        'src/models/**',
        'src/components/icons/**',
        'src/types/**',
        'src/styles/**',

        // Other common exclusions
        '**/.git/**',
        '**/.github/**',
        '**/.vscode/**',
        '**/.husky/**',
        '**/scripts/**',
      ],
      
      // Include files in coverage
      include: [
        'src/**/*.{ts,tsx}',
      ],
      
      // All coverage information
      all: true,
      
      // Watermarks for coverage
      watermarks: {
        statements: [50, 80],
        branches: [50, 80],
        functions: [50, 80],
        lines: [50, 80],
      },
    },
    
    // Test timeout
    testTimeout: 10000,
    
    // Hook timeout
    hookTimeout: 10000,
    
    // Maximum number of workers
    maxWorkers: 4,
    
    // Minimum number of workers
    minWorkers: 2,
    
    // Worker threads
    threads: {
      enabled: true,
      maxThreads: 4,
      minThreads: 2,
    },
    
    // Silent mode
    silent: false,
    
    // Update snapshots
    update: false,
    
    // Watch mode configuration
    watch: {
      ignore: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/coverage/**',
      ],
    },
    
    // Pool configuration
    pool: 'threads',
    
    // Pool options
    poolOptions: {
      threads: {
        singleThread: false,
        maxThreads: 4,
        minThreads: 2,
      },
    },
    
    // Reporter configuration
    reporters: [
      'default',
      'html',
      'json',
    ],
    
    // Output file for JSON reporter
    outputFile: {
      json: './test-results.json',
    },
    
    // UI configuration
    ui: {
      enabled: false,
    },
    
    // Browser configuration (if needed)
    browser: {
      enabled: false,
      name: 'chrome',
      headless: true,
    },
    
    // CSS configuration for testing
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    
    // Environment variables for tests
    env: {
      NODE_ENV: 'test',
    },
    
    // Global setup and teardown
    globalSetup: undefined,
    globalTeardown: undefined,
    
    // Test isolation
    isolate: true,
    
    // Restore mocks between tests
    restoreMocks: true,
    
    // Clear mocks between tests
    clearMocks: true,
    
    // Mock reset between tests
    mockReset: true,
    
    // Unmock between tests
    unmock: true,
  },
  
  // Resolve configuration (inherited from Vite)
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@models': resolve(__dirname, './src/models'),
      '@utils': resolve(__dirname, './src/utils'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@effects': resolve(__dirname, './src/effects'),
      '@styles': resolve(__dirname, './src/styles'),
      '@types': resolve(__dirname, './src/types'),
      '@demo': resolve(__dirname, './src/demo'),
      '@examples': resolve(__dirname, './src/examples'),
      // Add specific aliases for test imports
      'src/components/common/test': resolve(__dirname, './src/components/common/test'),
      'src/components/GlobalContext': resolve(__dirname, './src/components/GlobalContext'),
    },
  },
  
  // Define global constants for tests
  define: {
    __DEV__: false,
    __PROD__: false,
    __TEST__: true,
    'process.env.NODE_ENV': JSON.stringify('test'),
  },
});
