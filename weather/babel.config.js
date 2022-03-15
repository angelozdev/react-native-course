const config = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@consts': './src/constants',
          '@services': './src/services',
          '@components': './src/components',
        },
      },
    ],
  ],
}

module.exports = config
