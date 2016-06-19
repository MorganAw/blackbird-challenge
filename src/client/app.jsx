import index_css                  from '../resources/styling/index';

import React                      from 'react';
import { render }                 from 'react-dom';
import { Provider }               from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore }   from 'react-router-redux';

import reactRoutes                from '../shared/reactRoutes';
import configStore                from '../shared/redux/store';

const initialState = window._INITIAL_STATE_;

const store = configStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={ store }>
    <Router history={ history } routes={ reactRoutes } />
  </Provider>,
  document.getElementById('content')
);