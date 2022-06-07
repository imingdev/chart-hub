const path = require('path');
const dayJs = require('dayjs');
const express = require('express');
const morgan = require('morgan');
const consola = require('consola');
const result = require('@mingdev/result');
const chartRouter = require('./router/chart');

// 自定义时间
morgan.token('date', () => dayJs().format('YYYY-MM-DD HH:mm:ss'));

express()
  .disable('x-powered-by')
  .set('trust proxy', 'loopback')
  .use((req, res, next) => {
    res.set('X-Powered-By', 'Ming Dev');

    next();
  })
  // 结果集返回
  .use(result)
  // 发送json数据
  .use(express.json())
  // 日志
  .use(morgan('[:date] :remote-addr ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'))
  // 静态资源
  .use(express.static(path.join(__dirname, 'public')))
  // 路由
  .use('/chart', chartRouter)
  .listen(10087, 'localhost', () => consola.ready({
    message: 'Server listening on http://localhost:10087',
    badge: true,
  }));
