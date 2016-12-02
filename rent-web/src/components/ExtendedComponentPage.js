import { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';

class ExtendedComponentPage extends Component {
  componentWillMount() {
    const location = browserHistory.getCurrentLocation();
    browserHistory.replace(location.pathname);
  }
}

ExtendedComponentPage.propTypes = {
  intl: PropTypes.objectOf(PropTypes.shape),
};

ExtendedComponentPage.contextTypes = {
  router: PropTypes.object,
};

module.exports = {
  ExtendedComponentPage,
};
