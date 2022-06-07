import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RenderJudge from '@/components/RenderJudge';
import Header from '@/components/Header';
import useRouterGetters from '@/store/getters/router';
import useRouterActions from '@/store/actions/router';
import routes from './routes';

// 路由控制
const RouterCtrl = ({ config }) => {
  const routerActions = useRouterActions();
  const { component, meta } = config;

  useEffect(() => {
    routerActions.setMeta(meta);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return React.createElement(component);
};

// 路由
const Router = () => {
  const { meta: { header } } = useRouterGetters();

  return (
    <BrowserRouter>
      <RenderJudge
        value={header}
        active={(<Header value={header} />)}
      />
      <Suspense fallback={null}>
        <Routes>
          {routes.map((row, index) => (
            <Route
              element={(<RouterCtrl config={row} />)}
              path={row.path}
              strict={row.strict}
              exact={row.exact}
              key={row.name || index}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
