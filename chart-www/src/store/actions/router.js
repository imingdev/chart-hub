import { useDispatch } from 'react-redux';
import { SET_META } from '../types/router';

export default () => {
  const dispatch = useDispatch();

  return {
    // 设置路由meta
    setMeta: (meta) => dispatch({ type: SET_META, data: meta }),
  };
};
