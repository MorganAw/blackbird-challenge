import React                    from 'react';
import { Route, IndexRoute }    from 'react-router';

import Base                     from './components/Base';
import App                      from './components/App';
import FourOhFour               from './components/FourOhFour';

const reactRoutes = (
  <Route path="/" component={ Base } key="base">
    <IndexRoute
      component={ App }
      key="app" />
    <Route
      path="*"
      component={ FourOhFour }
      key="404" />
 </Route>
);

export default reactRoutes;