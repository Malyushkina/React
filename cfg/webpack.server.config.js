const path = require('path');
const nodeExternals = require('webpack-node-externals'); //пакет убирает лишние node_modules из серверного бандла

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  target: 'node',
  entry: path.resolve(__dirname, '../src/server/server.js'),
  output: {
    path: path.resolve(__dirname, '../dist/server'), //куда складывать
    filename: 'server.js', //имя бандла
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  //настройки loader
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/, //регулярное выражение - все файлы с именем .tsx и .jsx
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  mode: NODE_ENV ? NODE_ENV : 'development', //режим разработка или продакшн
  externals: [nodeExternals()],
  // optimization: {
  //   minimize: false,
  // },
};
