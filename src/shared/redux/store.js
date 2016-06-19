import { createStore,
         compose,
         applyMiddleware,
         combineReducers }    from 'redux';
import { routerReducer,
         routerMiddleware }   from 'react-router-redux';
import * as reducers          from './reducers/';

export default function configStore(history, initState) {
  const store = createStore(
    combineReducers(Object.assign({},
      reducers,
      { routing: routerReducer }
    )),
    initState,
    compose(
      process.env.NODE_ENV !== 'production'
        && typeof window === 'object'
        && typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension()
        : f => f
    )
  ); 
  return store;
}