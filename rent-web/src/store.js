/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import DevTools from './modules/App/components/DevTools';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const reduxRouterMiddleware = routerMiddleware(browserHistory);

// Middleware and store enhancers
const enhancers = [
  applyMiddleware(sagaMiddleware),
  applyMiddleware(reduxRouterMiddleware),
];

if (process.env.NODE_ENV !== 'production') {
  // Enable DevTools only when rendering on client and during development.
  enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
}

const store = createStore(rootReducer, compose(...enhancers));

sagaMiddleware.run(rootSaga);

// For hot reloading reducers
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers').default; // eslint-disable-line global-require
    store.replaceReducer(nextReducer);
  });
}

export default store;
