import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BackTop } from 'antd';

import './App.less';

// Import Components
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

class App extends Component {
  constructor(props) {
    super(props);
    const loaderPage = document.getElementsByClassName('loader_page')[0];
    loaderPage.style.opacity = 0;
    setTimeout(() => {
      if (loaderPage.remove) {
        loaderPage.remove();
      }
    }, 1000);
  }
  componentWillMount() {
    document.getElementById('root').style.opacity = 1;
  }
  render() {
    return (
      <div className="wrapper">
        {!window.devToolsExtension && process.env.NODE_ENV !== 'production' && process.env.USE_REDUX_DEVTOOLS === 'true' && <DevTools />}
        <Header />
        <div className="main">
          <Sidebar />
          <div className="content">
            {this.props.children}
          </div>
        </div>
        <BackTop />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.objectOf(PropTypes.shape).isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
