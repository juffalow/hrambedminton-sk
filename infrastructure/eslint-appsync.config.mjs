import { defineConfig } from 'eslint/config';
import appsync from '@aws-appsync/eslint-plugin';

export default defineConfig(
  appsync.configs.base,
  {
    ignores: [
      'node_modules',
      'cdk.out',
      'jest.config.js',
      '**/*.js',
      '!lib/graphql/resolvers/*.js',
      '**/*.d.ts',
    ],
  },
);
