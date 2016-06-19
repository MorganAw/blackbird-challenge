import React                          from 'react'
import { Provider }                   from 'react-redux';
import { match,
         createMemoryHistory,
         RouterContext }              from 'react-router';
import { syncHistoryWithStore }       from 'react-router-redux';
import { renderToString }             from 'react-dom/server';

import reactRoutes                    from '../../shared/reactRoutes';
import configStore                    from '../../shared/redux/store';

export default function useRoutes(server, router) {
  router.use('/', (req, res) => {
    serverRender(req, res);
  });

  server.use(router);
}

function serverRender(req, res) {
  const memoryHistory = createMemoryHistory(req.url);
  const store = configStore(memoryHistory, {});
  const history = syncHistoryWithStore(memoryHistory, store);

  match(
    { history, routes: reactRoutes , location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const content = renderToString(
          <Provider store={ store }>
            <RouterContext { ...renderProps } />
          </Provider>
        );

        const finalState = store.getState();

        const initialData = {
          app: content,
          initialState: finalState
        };
        res.status(200).render('index.pug', initialData);
      } else {
        res.status(404).send('Not Found');
      }
  });
}