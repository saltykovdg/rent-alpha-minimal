import React from 'react';
import ReactDOM from 'react-dom';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import { LocaleProvider } from 'antd';

import App from './App';
import store from './store';

// Initialize store
const mountApp = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <LocaleProvider locale={ruRU}>
      <Component store={store} />
    </LocaleProvider>,
    mountApp
  );
};

render(App);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept();
}
