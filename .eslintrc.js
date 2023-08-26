module.exports = {
  extends: ['next', 'prettier'],
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
