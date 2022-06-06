import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const reducers = {};
const context = require.context('./reducers', false, /\.(jsx?)$/);
context.keys().forEach((module) => {
  const item = context(module);
  reducers[module.replace(/^.*\//, '').replace(/\.(jsx?)$/, '')] = 'default' in item ? item.default : item;
});

const rootReducers = combineReducers(reducers);

export default createStore(rootReducers, composeWithDevTools());
