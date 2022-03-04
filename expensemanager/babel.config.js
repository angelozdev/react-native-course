module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
          '@features': './src/features',
          '@pages': './src/pages'
        }
      }
    ]
  ]
}
