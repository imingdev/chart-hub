import { lazy } from 'react';

export default [{
  path: '/chart/:id',
  name: 'ChartDetail',
  exact: true,
  component: lazy(() => import(/* webpackChunkName: "chart" */'@/pages/chart/_id')),
  meta: {
    header: true,
  },
}];
