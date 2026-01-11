import { defineConfig } from 'eslint/config';
import appsync from '@aws-appsync/eslint-plugin';

export default defineConfig(
  // appsync.configs.base,
  { languageOptions: { parserOptions: { projectService: true } } },
  appsync.configs.recommended,
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
