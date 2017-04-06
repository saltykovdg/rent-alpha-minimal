import { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { notification } from 'antd';

import * as HttpStatus from './../util/HttpStatus';

const DATE_FORMAT = 'YYYY-MM-DD';

class ExtendedComponent extends Component {
  componentDidUpdate() {
    if (this.props.isRequestError && this.props.isRequestError === HttpStatus.CONFLICT) {
      notification.error({
        message: this.props.intl.messages.getRequestErrorTitle,
        description: this.props.intl.messages.getRequestErrorConflictDescription,
      });
    } else if (this.props.isRequestError) {
      notification.error({
        message: this.props.intl.messages.getRequestErrorTitle,
        description: this.props.intl.messages.getRequestErrorDescription,
      });
    }
    if (this.props.isSaved) {
      notification.success({
        message: this.props.intl.messages.saveDataSuccessTitle,
        description: this.props.intl.messages.saveDataSuccessDescription,
      });
    }
    if (this.props.isDeleted) {
      notification.success({
        message: this.props.intl.messages.deleteRecordTitle,
        description: this.props.intl.messages.deleteRecordSuccessDescription,
      });
    }
  }
  getColumn = (title, name) => {
    return { title, dataIndex: name, key: name };
  };
  getDateColumn = (title, name) => {
    return {
      title,
      dataIndex: name,
      key: name,
      render(text) {
        let value = text;
        if (value && value.constructor.name === 'Moment') {
          value = value.format(DATE_FORMAT);
        }
        return value;
      },
    };
  }
  forwardTo = (url) => {
    browserHistory.push(url);
  };
}

ExtendedComponent.propTypes = {
  intl: PropTypes.objectOf(PropTypes.shape),
  isRequestError: PropTypes.any,
  isSaved: PropTypes.bool,
  isDeleted: PropTypes.bool,
};

ExtendedComponent.contextTypes = {
  router: PropTypes.object,
};

module.exports = {
  ExtendedComponent,
};
