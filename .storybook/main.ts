import path from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { mergeConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)', '../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-themes', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  async viteFinal(config, { configType }) {
    const storybookDir = path.dirname(fileURLToPath(import.meta.url));
    const srcDir = path.resolve(storybookDir, '../src');
    return mergeConfig(config, {
      plugins: [
        tsconfigPaths({
          projects: ['./tsconfig.json'],
        }),
        vanillaExtractPlugin({
          // Use 'short' identifiers for production builds, 'debug' for development
          // This ensures consistent class names in production and readable names in dev
          identifiers: configType === 'PRODUCTION' ? 'short' : 'debug',
        }),
      ],
      // Ensure CSS is properly handled in production builds
      css: {
        devSourcemap: configType === 'DEVELOPMENT',
      },
      // Optimize dependencies - exclude vanilla-extract from optimization
      // This ensures vanilla-extract CSS is processed correctly in both dev and prod
      // and prevents issues with CSS not being loaded in production builds
      optimizeDeps: {
        exclude: ['@vanilla-extract/css', '@vanilla-extract/dynamic'],
      },
      resolve: {
        alias: {
          src: srcDir,
        },
      },
    });
  }
};

export default config;
