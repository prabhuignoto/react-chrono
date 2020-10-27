module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.json',
    },
  },
};
