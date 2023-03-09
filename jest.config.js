module.exports = {
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.json',
    },
  },
  modulePathIgnorePatterns: ['cypress'],
  preset: 'ts-jest/presets/js-with-babel',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
};
