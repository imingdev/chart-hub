const path = require('path');
const dayJs = require('dayjs');
const express = require('express');
const morgan = require('morgan');
const consola = require('consola');

// 自定义时间
morgan.token('date', () => dayJs().format('YYYY-MM-DD HH:mm:ss'));

express()
  .disable('x-powered-by')
  .set('trust proxy', 'loopback')
  .use((req, res, next) => {
    res.set('X-Powered-By', 'Ming Dev');

    next();
  })
  // 日志
  .use(morgan('[:date] :remote-addr ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'))
  // 静态资源
  .use(express.static(path.join(__dirname, '../public')))
  .listen(10088, 'localhost', () => consola.ready({
    message: 'Server listening on http://localhost:10088',
    badge: true,
  }));
