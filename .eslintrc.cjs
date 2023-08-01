'use strict';
/* eslint-disable sort-keys */
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  plugins: ['kuzzle'],
  extends: ['plugin:kuzzle/default', 'plugin:kuzzle/node'],
  ignorePatterns: ['dist'],
  overrides: [
    {
      files: ['*.ts'],
      extends: ['plugin:kuzzle/typescript'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/prefer-nullish-coalescing': [
          'error',
          { ignoreConditionalTests: false, ignoreMixedLogicalExpressions: false },
        ],
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false,
            allowNullableBoolean: false,
            allowNullableString: false,
            allowNullableNumber: false,
            allowAny: false,
          },
        ],
      },
    },
  ],
};
