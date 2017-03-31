import { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';

class ExtendedComponentPage extends Component {
  componentWillMount() {
    const location = browserHistory.getCurrentLocation();
    browserHistory.replace(location.pathname);
  }
  getActualPageAfterDelete() {
    let page = this.state.page;
    if (this.props.data.content.length === 1) {
      page -= 1;
      this.setState({ page });
    }
    return page;
  }
}

ExtendedComponentPage.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape),
};

ExtendedComponentPage.contextTypes = {
  router: PropTypes.object,
};

module.exports = {
  ExtendedComponentPage,
};
