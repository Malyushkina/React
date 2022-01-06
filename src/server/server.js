//рендеринг на сервере

import express from 'express';
import ReactDom from 'react-dom/server';
import { Header } from '../shared/Header.jsx';
import { indexTemplate } from './indexTemplate.js';

const app = express();

app.use('/static', express.static('./dist/client'));//определили, что по url /static доступны все файлы, лежащие в ./dist/client

//каждый раз, когда нам будет приходить get-запрос на корневой каталог,
//express будет вызывать для нас коллбек, который будет передавать две переменные req и res
//req - запрос, а res мы формируем
app.get('/', (req, res) => {
  res.send(indexTemplate(ReactDom.renderToString(Header())));
});

//вызываем сервер
app.listen(3000, () => {
  console.log('Server started on localhost:3000');
});
