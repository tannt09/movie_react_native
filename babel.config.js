module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@context': './src/context',
          '@models': './src/models',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: process.env.ENV_PATH || '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
