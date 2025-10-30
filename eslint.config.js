import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import angularEslint from '@angular-eslint/eslint-plugin';
import angularTemplateEslint from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import prettier from 'eslint-config-prettier';
import { off } from 'node:process';

export default [
  {
    ignores: [
      '.angular/',
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      'out/',
      'tmp/',
      '*.min.js',
      '*.bundle.js',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@angular-eslint': angularEslint,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...angularEslint.configs.recommended.rules,
      ...prettier.rules,
      'no-console': 'warn',
      //'no-console': 'off',
      'no-debugger': 'error',
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplateEslint,
    },
    rules: {
      ...angularTemplateEslint.configs.recommended.rules,
    },
  },
];
