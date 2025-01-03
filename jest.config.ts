import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@common/(.*)$': '<rootDir>/common/$1',
    '^@database/(.*)$': '<rootDir>/database/$1',
    '^@auth/(.*)$': '<rootDir>/auth/$1',
    '^@session/(.*)$': '<rootDir>/modules/session/$1',
    '^@users/(.*)$': '<rootDir>/modules/users/$1',
    '^@event/(.*)$': '<rootDir>/modules/event/$1',
    '^@health/(.*)$': '<rootDir>/health/$1',
  },
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
