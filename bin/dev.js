const webpack = require('webpack');
const [webpackClientConfig, webpackServerConfig] = require('../webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const hmrServer = express();
const clientCompiler = webpack(webpackClientConfig);
hmrServer.use(
  webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true,
    writeToDisk: true,
    stats: 'errors-only',
  })
);
hmrServer.use(
  webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr',
  })
);
hmrServer.listen(3001, () => {
  console.log('HMR server sucsessfully started');
});

const compiler = webpack(webpackServerConfig);
const nodemon = require('nodemon');
const path = require('path');

compiler.run((err) => {
  //запускаем сервер в холодном режиме, если компиляция прошла успешно - запускаем watch
  if (err) {
    console.log('compilation is failed', err);
  }
  compiler.watch({}, (err) => {
    if (err) {
      console.log('compilation is failed', err);
    }
  });
  nodemon({
    // перезапускает сервер, если внесли изменения в dist
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/server'),
      path.resolve(__dirname, '../dist/client'),
    ],
  });
});
