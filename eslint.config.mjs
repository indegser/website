import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import unicorn from 'eslint-plugin-unicorn';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * eslint-config-studio
 * import studio from '@sanity/eslint-config-studio'
 * export default [...studio]
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('next', 'plugin:prettier/recommended'),
  {
    plugins: {
      unicorn,
    },

    rules: {
      'no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          vars: 'all',
        },
      ],

      'prefer-const': 'error',
      'react-hooks/exhaustive-deps': 'error',

      'unicorn/filename-case': [
        'warn',
        {
          case: 'kebabCase',
        },
      ],
    },
  },
];
