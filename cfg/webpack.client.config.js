const path = require('path');

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
  },
  mode: NODE_ENV ? NODE_ENV : 'development', //режим разработка или продакшн
  entry: path.resolve(__dirname, '../src/client/index.jsx'), //откуда начинать
  output: {
    path: path.resolve(__dirname, '../dist/client'), //куда складывать
    filename: 'client.js', //имя бандла
  },
  //настройки loader
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/, //регулярное выражение - все файлы с именем .tsx и .jsx
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }
      },
    ],
  },
  devtool: setupDevtool(), //конфигурации devtool в зависимости от режима (разработка или продакшн)
};
