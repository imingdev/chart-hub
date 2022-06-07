import { lazy } from 'react';

export default [{
  path: '/',
  name: 'Home',
  exact: true,
  component: lazy(() => import(/* webpackChunkName: "home" */'@/pages/home')),
  meta: {
    header: true,
  },
}];
