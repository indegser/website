import nextConfig from 'eslint-config-next';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import unicorn from 'eslint-plugin-unicorn';

export default [
  ...nextConfig,
  prettierRecommended,
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
