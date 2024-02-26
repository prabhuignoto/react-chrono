/* eslint-disable import/no-unused-modules */
import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      bundler: 'webpack',
      framework: 'react',
    },
  },

  defaultCommandTimeout: 10000,

  e2e: {
    baseUrl: 'http://localhost:4444',

    excludeSpecPattern: '**/examples/*.js',
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // full screen
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--start-fullscreen');
          return launchOptions;
        }

        if (browser.name === 'electron') {
          launchOptions.preferences.fullscreen = true;
          return launchOptions;
        }
      });
      // return require('./cypress/plugins/index.js')(on, config);
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
  projectId: '8zb5a5',

  video: false,
  viewportHeight: 1080,

  viewportWidth: 1920,
  watchForFileChanges: false,
});
