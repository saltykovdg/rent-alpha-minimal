import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ServiceList from './../components/ServiceList';

// Import Actions
import * as ServiceAction from './../actions/ServiceAction';

// Import Selectors
import {
  getServiceListData,
  getServiceIsLoading,
  getServiceIsRequestError,
  getServiceIsDeleted,
} from './../reducers/ServiceReducer';

class ServiceListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(ServiceAction.getServices(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(ServiceAction.getServices(page));
  };
  onDelete = (object) => {
    this.props.dispatch(ServiceAction.deleteService(object));
  };
  render() {
    return (
      <ServiceList
        data={this.props.data}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        onChangePage={this.onChangePage}
        onDelete={this.onDelete}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    data: getServiceListData(state),
    isLoading: getServiceIsLoading(state),
    isRequestError: getServiceIsRequestError(state),
    isDeleted: getServiceIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(ServiceListPage));
