/**
 * @intro: sequelize实例.
 */
const { Sequelize } = require('sequelize');
const { sequelize: { database, username, password, ...config } } = require('./setting');

module.exports = new Sequelize(database, username, password, config);
