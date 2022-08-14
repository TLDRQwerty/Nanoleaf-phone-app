module.exports = {
  extends: [
    'eslint-config-airbnb',

    'plugin:prettier/recommended',
    'prettier',

    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',

    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['unused-imports', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'import/extensions': 0,
    'no-use-before-define': 0,

    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,

    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx'],
      },
    ],

    // Things to fixy fix
    'import/no-cycle': 1,
    'react/destructuring-assignment': 1,
    '@typescript-eslint/no-empty-function': 1,
    'react/sort-comp': 1,

    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    camelcase: 0,
    'import/prefer-default-export': 0,
    'import/namespace': 0,

    'react/state-in-constructor': 0,
  },
  globals: {
    __DEV__: true,
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'react/display-name': 0,
      },
    },
  ],
}
