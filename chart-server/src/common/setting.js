/**
 * @intro: 一些配置.
 */
const path = require('path');

// sequelize配置
exports.sequelize = {
  database: 'db_chart',
  username: 'root',
  password: 'helloworld123',
  host: '172.18.8.8',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// 代码存放位置
exports.codeSaveDir = path.join(__dirname, '../resources/code');
