const ChartService = require('../service/chart');

// 列表
exports.list = async (req, res) => {
  const { keyword, classify, page, size } = req.query || {};
  const currentPage = Math.max(1, Number(page || 1));
  const pageSize = Math.max(1, Number(size || 20));

  try {
    const result = await ChartService.list({ keyword, classify, page: currentPage, size: pageSize });

    res.result.success(result);
  } catch (e) {
    res.result.error(e.message);
  }
};

// 详情
exports.detail = async (req, res) => {
  try {
    const result = await ChartService.detail(req.params.id);
    if (!result) return res.result.notPage();

    res.result.success(result);
  } catch (e) {
    res.result.error(e.message);
  }
};
