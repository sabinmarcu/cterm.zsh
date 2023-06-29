module.exports = {
  extends: '@sabinmarcu',
  parserOptions: {
    project: 'tsconfig.json',
  },
  rules: {
    'unicorn/expiring-todo-comments': 0,
    'no-await-in-loop': 0,
    'unicorn/prevent-abbreviations': [
      'error',
      {
        extendDefaultReplacements: true,
        extendDefaultAllowList: true,
        allowList: {
          args: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['src/cli/**/*'],
      rules: {

        'unicorn/filename-case': 0,
      },
    },
  ],
};
