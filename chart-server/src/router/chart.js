const express = require('express');
const ChartController = require('../controller/chart');

const router = express.Router();

// 列表
router.get('/list', ChartController.list);
// 详情
router.get('/detail/:id', ChartController.detail);

module.exports = router;
