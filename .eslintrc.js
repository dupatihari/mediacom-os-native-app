const fs = require('fs')
const path = require('path')

const internalImportsNames = fs
  .readdirSync(path.resolve('./src'), {
    withFileTypes: true,
  })
  .filter(resource => resource.isDirectory())
  .map(resource => resource.name)

const internalImportsRegex = `^(${internalImportsNames.join('|')})`

module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-duplicate-imports': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      process.env.PRECOMMIT ? 'error' : 'warn',
      {
        argsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': process.env.PRECOMMIT ? 'error' : 'warn',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'index'],
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/self-closing-comp': 'error',
  },
  settings: {
    'import/internal-regex': internalImportsRegex,
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['node_modules', 'dist', 'public'],
}
