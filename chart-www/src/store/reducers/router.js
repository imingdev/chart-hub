/**
 * @intro: 路由相关管理器.
 */
import { SET_META } from '../types/router';

const defaultState = {
  meta: {},
};

export default (state = defaultState, { type, data }) => {
  const newState = { ...state };
  switch (type) {
    case SET_META:
      newState.meta = data || {};
      break;
    default:
      return newState;
  }
  return newState;
};
