import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import babelParser from '@babel/eslint-parser';
import cypressPlugin from 'eslint-plugin-cypress';

export default [
  // Базовые правила ESLint
  js.configs.recommended,

  // Игнорируемые файлы
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'test/fixtures',
      '**/app/public',
      'package-lock.json',
      'playwright.config.js',
      // Игнорируем временные файлы Cypress
      'cypress/downloads/**',
      'cypress/screenshots/**',
      'cypress/videos/**',
    ],
  },

  // Основная конфигурация для всех JS файлов
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Конфигурация для файлов Cypress
  {
    files: ['cypress/**/*.js', 'cypress/**/*.ts'],
    plugins: {
      cypress: cypressPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        // Глобальные переменные Cypress
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
        // Дополнительные переменные Mocha (Cypress использует Mocha)
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        context: 'readonly',
      },
    },
    rules: {
      // Основные правила Cypress (убрал дублирование)
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'warn',
      'cypress/require-data-selectors': 'warn',
      'cypress/no-pause': 'error',
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-async-tests': 'error',

      // Дополнительные настройки
      'no-unused-expressions': 'off', // Mocha требует выражения
      'prettier/prettier': 'error',
      'no-console': 'off', // В тестах console.log полезен
    },
  },

  // Переопределение для server.js
  {
    files: ['server.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Prettier конфиг должен быть последним
  prettier,
];
