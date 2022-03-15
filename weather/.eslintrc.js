/** @type {import("eslint").Linter.BaseConfig} */
const config = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'plugin:react-native-a11y/ios',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'prettier/prettier': 'error',
      },
    },
  ],
}

module.exports = config
