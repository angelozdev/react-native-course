module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
          '@assets': './src/assets',
          '@consts': './src/constants',
          '@features': './src/features',
          '@pages': './src/pages',
          '@theme': './src/theme',
          '@utils': './src/utils'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
}
