module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-extra-semi': 'off',
    'no-return-await': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    'no-console': 'warn',
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      files: ['*.spec.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: [
        ['config', './src/config'],
        ['common', './src/common'],
        ['auth', './src/auth'],
        ['session', './src/session'],
        ['users', './src/users'],
        ['database', './src/database'],
        ['health', './src/health'],
        ['database', './database'],
        ['prometheus', './src/prometheus'],
        ['gpt', './libs/gpt']
      ],
    },
  },
};