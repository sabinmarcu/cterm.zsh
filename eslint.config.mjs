import rootConfig, { logConfigs } from '@sabinmarcu/eslint-config';

const config = [
  ...rootConfig,
  {
    rules: {
      'unicorn/expiring-todo-comments': 'off',
      'unicorn/filename-case': 'off',
    },
  },
];

logConfigs(config);

export default config;

