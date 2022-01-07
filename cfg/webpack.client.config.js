const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

function setupDevtool() {
  if (IS_DEV) {
    return 'eval';
  }
  if (IS_PROD) {
    return false;
  }
}

module.exports = {
  //опишем все файлы, которые webpack должен резолвить, переписывает дефолтный массив, поэтому пишем все нужные расширения
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom', //если разработка, то вместо react-dom будет отдаваться hot-loader/react-dom
    },
  },
  mode: NODE_ENV ? NODE_ENV : 'development', //режим разработка или продакшн
  entry: [
    //откуда начинать
    path.resolve(__dirname, '../src/client/index.jsx'),
    'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr',
  ],
  output: {
    path: path.resolve(__dirname, '../dist/client'), //куда складывать
    filename: 'client.js', //имя бандла
    publicPath: '/static/',
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
  devtool: setupDevtool(), //конфигурации devtool в зависимости от режима (разработка или продакшн)
  plugins: IS_DEV
    ? [
        new HotModuleReplacementPlugin(), //нужен для работы webpack-hot-middleware
        new CleanWebpackPlugin(), // удаляет лишние чанки
      ]
    : [],
};
