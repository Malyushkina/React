const path = require('path');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

const HTMLWebpackPlugin = require('html-webpack-plugin'); //чтобы в dist попадал не только бандл, но и html

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
  },
  mode: NODE_ENV ? NODE_ENV : 'development', //режим разработка или продакшн
  entry: path.resolve(__dirname, 'src/index.jsx'), //откуда начинать
  output: {
    path: path.resolve(__dirname, 'dist'), //куда складывать
    filename: 'index.js', //имя бандла
  },
  //настройки loader
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/, //регулярное выражение - все файлы с именем .tsx и .jsx
        use: ['ts-loader'], //обрабатывай с помощью ts-loader
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
  ],
  devServer: {
    port: 3000, //номер порта localhost:3000
    open: true, //при поднятии сервера будет сразу разворачиваться приложение
    hot: IS_DEV, //обновление страницы при изменении в файлах
  },
  devtool: setupDevtool(), //конфигурации devtool в зависимости от режима (разработка или продакшн)
};
