import React from 'react';
import { connect } from 'react-redux';
import { BackTop } from 'antd';

import './App.less';

// Import Actions
import * as WorkingPeriodAction from './../Constants/actions/WorkingPeriodAction';

// Import Components
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { ExtendedComponentPage } from './../../components/ExtendedComponentPage';

import {
  getWorkingPeriodListData,
  getWorkingPeriodEditData,
  getWorkingPeriodIsLoading,
  getWorkingPeriodIsRequestError,
} from './../Constants/reducers/WorkingPeriodReducer';

class App extends ExtendedComponentPage {
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
    this.setState({
      userName: 'Салтыков Д. Г.',
    });
    this.props.dispatch(WorkingPeriodAction.getWorkingPeriods());
    this.props.dispatch(WorkingPeriodAction.findLastWorkingPeriod());
  }
  render() {
    return (
      <div className="wrapper">
        {!window.devToolsExtension && process.env.NODE_ENV !== 'production' && process.env.USE_REDUX_DEVTOOLS === 'true' && <DevTools />}
        <Header
          userName={this.state.userName}
          currentWorkingPeriod={this.props.currentWorkingPeriod}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
        />
        <div className="main">
          <Sidebar />
          <div className="content">
            {
              React.cloneElement(this.props.children, {
                workingPeriods: this.props.workingPeriods,
                currentWorkingPeriod: this.props.currentWorkingPeriod,
              })
            }
          </div>
        </div>
        <BackTop />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, store) {
  return {
    intl: store.intl,
    workingPeriods: getWorkingPeriodListData(state),
    currentWorkingPeriod: getWorkingPeriodEditData(state),
    isLoading: getWorkingPeriodIsLoading(state),
    isRequestError: getWorkingPeriodIsRequestError(state),
  };
}

export default connect(mapStateToProps)(App);
