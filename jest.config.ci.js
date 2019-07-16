module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  rootDir: 'src/',
  reporters: ['default', 'jest-junit'],
  collectCoverage: true,
};
