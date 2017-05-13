import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import StreetList from './../components/StreetList';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getStreetListData,
  getStreetIsLoading,
  getStreetIsRequestError,
  getStreetIsDeleted,
} from './../AddressReducer';

class StreetListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      searchFieldServiceType: '',
      searchFieldService: '',
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(AddressAction.findStreets(
      this.state.searchFieldServiceType,
      this.state.searchFieldService,
      this.state.page,
    ));
  }
  onSearch = (serviceType, service) => {
    this.setState({
      page: 0,
      searchFieldServiceType: serviceType,
      searchFieldService: service,
    });
    this.props.dispatch(AddressAction.findStreets(serviceType, service, 0));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(AddressAction.findStreets(
      this.state.searchFieldServiceType,
      this.state.searchFieldService,
      page,
    ));
  };
  onDelete = (object) => {
    this.props.dispatch(AddressAction.deleteStreet(
      object,
      this.state.searchFieldServiceType,
      this.state.searchFieldService,
      this.getActualPageAfterDelete(),
    ));
  };
  render() {
    if (!this.props.data) return null;
    return (
      <StreetList
        data={this.props.data}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isDeleted={this.props.isDeleted}
        onChangePage={this.onChangePage}
        onDelete={this.onDelete}
        onSearch={this.onSearch}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    data: getStreetListData(state),
    isLoading: getStreetIsLoading(state),
    isRequestError: getStreetIsRequestError(state),
    isDeleted: getStreetIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(StreetListPage));
