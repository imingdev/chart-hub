const path = require('path');
const fs = require('fs');
const { codeSaveDir } = require('./setting');

/**
 * 根据id获取代码
 * @param id  id
 */
exports.getCodeById = (id) => new Promise((resolve, reject) => {
  fs.readFile(path.join(codeSaveDir, id), 'utf8', (err, res) => {
    if (err) return reject(err);

    return resolve(res);
  });
});
