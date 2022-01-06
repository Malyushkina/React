const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig);
const nodemon = require('nodemon');
const path = require('path');

compiler.run((err) => {//запускаем сервер в холодном режиме, если компиляция прошла успешно - запускаем watch
  if (err) {
    console.log('compilation is failed', err);
  }
  compiler.watch({}, (err) => {
    if (err) {
      console.log('compilation is failed', err);
    }
  });
  nodemon({// перезапускает сервер, если внесли изменения в dist
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/server'),
      path.resolve(__dirname, '../dist/client'),
    ],
  });
});
