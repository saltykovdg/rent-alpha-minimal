import { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { notification } from 'antd';

import * as HttpStatus from './../util/HttpStatus';

class ExtendedComponent extends Component {
  componentWillMount() {
    const location = browserHistory.getCurrentLocation();
    browserHistory.replace(location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isRequestError && nextProps.isRequestError === HttpStatus.CONFLICT) {
      notification.error({
        message: this.props.intl.messages.getRequestErrorTitle,
        description: this.props.intl.messages.getRequestErrorConflictDescription,
      });
    } else if (nextProps.isRequestError) {
      notification.error({
        message: this.props.intl.messages.getRequestErrorTitle,
        description: this.props.intl.messages.getRequestErrorDescription,
      });
    }
    if (nextProps.isSaved) {
      notification.success({
        message: this.props.intl.messages.saveDataSuccessTitle,
        description: this.props.intl.messages.saveDataSuccessDescription,
      });
    }
    if (nextProps.isDeleted) {
      notification.success({
        message: this.props.intl.messages.deleteRecordTitle,
        description: this.props.intl.messages.deleteRecordSuccessDescription,
      });
    }
  }
  forwardTo = (url) => {
    browserHistory.push(url);
  };
}

ExtendedComponent.propTypes = {
  intl: PropTypes.objectOf(PropTypes.shape),
};

ExtendedComponent.contextTypes = {
  router: PropTypes.object,
};

module.exports = {
  ExtendedComponent,
};
