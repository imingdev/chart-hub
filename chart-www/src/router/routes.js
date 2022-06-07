/**
 * @intro: 组件集合，将扫描modules下面的所有的组件.
 */
const context = require.context('./modules', true, /\.jsx?$/);

let result = [];

context.keys().forEach((module) => {
  const item = context(module);
  result = result.concat(item.default || item);
});

// 将404页面放到最后
export default result.sort((a, b) => a.path.indexOf('*') - b.path.indexOf('*'));
