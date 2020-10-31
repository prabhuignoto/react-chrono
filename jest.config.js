module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  modulePathIgnorePatterns: ["cypress"],
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.json',
    },
  },
};
