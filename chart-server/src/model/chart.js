const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('chart', {
  id: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    primaryKey: true,
    comment: '主键',
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '标题',
  },
  summary: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '简介',
  },
  version: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: 'echarts 版本号',
  },
  external: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '外部脚本，多个使用英文逗号隔开',
  },
  tags: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '标签，多个使用英文逗号隔开',
  },
  sourceId: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'makeapie里边的数据id',
  },
  thumbnail: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '缩略图',
  },
}, {
  sequelize,
  tableName: 'chart',
  timestamps: false,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id' },
      ],
    },
  ],
});
