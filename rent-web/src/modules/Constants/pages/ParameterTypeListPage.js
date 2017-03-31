import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ParameterTypeList from './../components/ParameterTypeList';

// Import Actions
import * as ParameterTypeAction from './../actions/ParameterTypeAction';

// Import Selectors
import {
  getParameterTypeListData,
  getParameterTypeIsLoading,
  getParameterTypeIsRequestError,
  getParameterTypeIsDeleted,
} from './../reducers/ParameterTypeReducer';

class ParameterTypeListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(ParameterTypeAction.getParameterTypes(this.state.page));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(ParameterTypeAction.getParameterTypes(page));
  };
  onDelete = (object) => {
    this.props.dispatch(ParameterTypeAction.deleteParameterType(object, this.getActualPageAfterDelete()));
  };
  render() {
    return (
      <ParameterTypeList
        data={this.props.data}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isDeleted={this.props.isDeleted}
        onChangePage={this.onChangePage}
        onDelete={this.onDelete}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    data: getParameterTypeListData(state),
    isLoading: getParameterTypeIsLoading(state),
    isRequestError: getParameterTypeIsRequestError(state),
    isDeleted: getParameterTypeIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(ParameterTypeListPage));
