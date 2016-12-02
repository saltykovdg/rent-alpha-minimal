import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import { LocaleProvider } from 'antd';

import App from './App';
import store from './store';

// Initialize store
const mountApp = document.getElementById('root');

render(
  <AppContainer>
    <LocaleProvider locale={ruRU}>
      <App store={store} />
    </LocaleProvider>
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <LocaleProvider locale={ruRU}>
          <NextApp store={store} />
        </LocaleProvider>
      </AppContainer>,
      mountApp
    );
  });
}
