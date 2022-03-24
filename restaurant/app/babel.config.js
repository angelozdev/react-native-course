module.exports = {
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
        root: ['./'],
        alias: {
          '@features': './src/features',
          '@redux': './src/redux',
          '@screens': './src/screens',
        },
      },
    ],
  ],
}
