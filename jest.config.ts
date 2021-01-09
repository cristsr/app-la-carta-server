// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  moduleNameMapper: {
    '^@modules(.*)$': '<rootDir>/src/modules$1',
    '^@database(.*)$': '<rootDir>/src/database$1',
    '^@config(.*)$': '<rootDir>/src/config$1',
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
};

export default config;
