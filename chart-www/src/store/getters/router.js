import { useSelector } from 'react-redux';

export default () => {
  const { meta } = useSelector(({ router }) => router || {});
  return {
    // 获取路由meta
    meta: meta || {},
  };
};
