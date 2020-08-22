module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/setuptests.ts"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
};
