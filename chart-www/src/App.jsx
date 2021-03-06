import React from 'react';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import store from './store';
import Router from './router';

const App = () => (
  <Provider store={store}>
    <Helmet
      title={process.env.TITLE}
      meta={[{
        name: 'keywords',
        content: process.env.KEYWORDS,
      }, {
        name: 'description',
        content: process.env.DESCRIPTION,
      }]}
    />
    <Router />
  </Provider>
);

export default App;
