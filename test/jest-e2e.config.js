// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('../jest.config.js');

module.exports = {
  ...baseConfig,
  rootDir: '.',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/../src/$1',
  },
  testRegex: '.e2e-spec.ts$',
};
