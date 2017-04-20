/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import IntlWrapper from './modules/Intl/IntlWrapper';

// Import Routes
import routes from './routes';

export default function App(props) {
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, props.store);
  return (
    <Provider store={props.store}>
      <IntlWrapper>
        <Router history={history}>
          {routes}
        </Router>
      </IntlWrapper>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.objectOf(PropTypes.shape).isRequired,
};
