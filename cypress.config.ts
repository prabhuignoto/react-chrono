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
  requestTimeout: 10000,
  responseTimeout: 30000,

  e2e: {
    baseUrl: 'http://localhost:4444',
    excludeSpecPattern: '**/examples/*.js',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',

    setupNodeEvents(on, config) {
      // Modern browser launch configuration
      on('before:browser:launch', (browser, launchOptions) => {
        // Chrome/Chromium browsers
        if (browser.family === 'chromium') {
          launchOptions.args.push('--start-fullscreen');
          launchOptions.args.push('--disable-web-security');
          launchOptions.args.push('--disable-features=VizDisplayCompositor');
          return launchOptions;
        }

        // Firefox
        if (browser.name === 'firefox') {
          // launchOptions.args.push('--start-fullscreen');
          // launchOptions.args.push('--width=1920');
          // launchOptions.args.push('--height=1080');
          return launchOptions;
        }

        // Electron
        if (browser.name === 'electron') {
          launchOptions.preferences.fullscreen = true;
          launchOptions.preferences.width = 1920;
          launchOptions.preferences.height = 1080;
          return launchOptions;
        }

        return launchOptions;
      });

      // Modern task registration (if needed for custom tasks)
      // on('task', {
      //   // Add custom tasks here
      // });

      return config;
    },

    // Modern test isolation and experimental features
    testIsolation: true,
    experimentalStudio: true,
    experimentalWebKitSupport: false,
  },

  projectId: '8zb5a5',
  video: false,
  videoCompression: 32,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
  fixturesFolder: 'cypress/fixtures',
  supportFolder: 'cypress/support',

  viewportHeight: 1080,
  viewportWidth: 1920,

  watchForFileChanges: false,

  // Modern retry configuration
  retries: {
    runMode: 2,
    openMode: 0,
  },

  // Performance optimizations
  numTestsKeptInMemory: 5,

  // Modern security settings
  chromeWebSecurity: true,
  modifyObstructiveCode: false,

  // Environment variables
  env: {
    // Add any environment variables here
  },
});
