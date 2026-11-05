module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.cjs'],
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['index.js', 'routes/**/*.js', 'utils/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: { global: { lines: 60 } },
};
