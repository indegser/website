module.exports = {
  extends: ['next', 'plugin:prettier/recommended'],
  plugins: ['unicorn'],
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
};
