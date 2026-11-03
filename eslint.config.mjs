import kuzzle from 'eslint-plugin-kuzzle';

export default [
  { ignores: ['dist/**'] },
  ...kuzzle.configs.default,
  ...kuzzle.configs.node,
  ...kuzzle.configs.typescript,
  {
    // Type-aware rules: they need the TypeScript program, which
    // `configs.typescript` deliberately leaves off.
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.test.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignoreConditionalTests: false, ignoreMixedLogicalExpressions: false },
      ],
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowAny: false,
          allowNullableBoolean: false,
          allowNullableNumber: false,
          allowNullableObject: false,
          allowNullableString: false,
          allowNumber: false,
          allowString: false,
        },
      ],
    },
  },
];
