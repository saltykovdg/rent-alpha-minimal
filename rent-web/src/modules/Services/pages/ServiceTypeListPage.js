import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ServiceTypeList from './../components/ServiceTypeList';

// Import Actions
import * as ServiceTypeAction from './../actions/ServiceTypeAction';

// Import Selectors
import {
  getServiceTypeListData,
  getServiceTypeIsLoading,
  getServiceTypeIsRequestError,
  getServiceTypeIsDeleted,
} from './../reducers/ServiceTypeReducer';

class ServiceTypeListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(ServiceTypeAction.getServiceTypes(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(ServiceTypeAction.getServiceTypes(page));
  };
  onDelete = (object) => {
    this.props.dispatch(ServiceTypeAction.deleteServiceType(object));
  };
  render() {
    return (
      <ServiceTypeList
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
    data: getServiceTypeListData(state),
    isLoading: getServiceTypeIsLoading(state),
    isRequestError: getServiceTypeIsRequestError(state),
    isDeleted: getServiceTypeIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(ServiceTypeListPage));
