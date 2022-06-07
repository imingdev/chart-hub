const { Op, fn, col } = require('sequelize');
const ChartDao = require('../dao/chart');
const utils = require('../common/utils');

/**
 * 列表
 * @param keyword 关键词
 * @param classify  分类
 * @param page  当前页
 * @param size  总数量
 */
exports.list = async ({ keyword, classify, page, size }) => {
  const where = {};
  if (keyword) {
    // 关键词
    where.title = {
      [Op.like]: `%${keyword}%`,
    };
  }
  if (classify) {
    // 分类
    where[Op.and] = fn('FIND_IN_SET', `series-${classify}`, col('tags'));
  }

  const { count, rows } = await ChartDao.findAndCountAll({
    attributes: ['id', 'title', 'thumbnail', 'version'],
    where,
    offset: (page - 1) * size,
    limit: size,
    raw: true,
  });

  return {
    page,
    size,
    count,
    list: rows,
  };
};

// 详情
exports.detail = async (id) => {
  const res = await ChartDao.findByPk(id, {
    attributes: ['id', 'title', 'summary', 'version', 'external', 'thumbnail'],
    raw: true,
  });

  if (!res) return null;

  const code = await utils.getCodeById(res.id);

  return {
    ...res,
    code,
  };
};
