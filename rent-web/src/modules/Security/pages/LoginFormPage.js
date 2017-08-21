import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import NProgress from 'nprogress';

// Import Components
import LoginForm from './../components/LoginForm';

// Import Actions
import * as LoginAction from './../actions/LoginAction';

// Import Selectors
import {
  getLoginIsLoading,
  getLoginIsRequestError,
} from './../reducers/LoginReducer';

class LoginFormPage extends Component {
  constructor(props) {
    super(props);
    const loaderPage = document.getElementsByClassName('loader_page')[0];
    if (loaderPage) {
      loaderPage.style.opacity = 0;
    }
    setTimeout(() => {
      if (loaderPage && loaderPage.remove) {
        loaderPage.remove();
      }
    }, 1000);
  }
  componentWillMount() {
    document.getElementById('root').style.opacity = 1;
  }
  componentDidMount() {
    NProgress.done();
  }
  onLogin = (object) => {
    this.props.dispatch(LoginAction.login(object));
  };
  render() {
    return (
      <LoginForm
        onLogin={this.onLogin}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
      />
    );
  }
}

LoginFormPage.propTypes = {
  isRequestError: PropTypes.any,
  isLoading: PropTypes.bool,
  dispatch: PropTypes.func,
};

LoginFormPage.defaultProps = {
  isRequestError: false,
  isLoading: false,
  dispatch: null,
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    isLoading: getLoginIsLoading(state),
    isRequestError: getLoginIsRequestError(state),
  };
}

export default connect(mapStateToProps)(injectIntl(LoginFormPage));
