module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        baseUrl: './',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          '@features': './src/features',
          '@assets': './src/assets',
        },
      },
    ],
  ],
}
