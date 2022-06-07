/**
 * @intro: sequelize实例.
 */
const { Sequelize } = require('sequelize');
const { sequelize: sequelizeCfg } = require('./setting');

const { database, username, password, ...config } = sequelizeCfg;

module.exports = new Sequelize(database, username, password, config);
