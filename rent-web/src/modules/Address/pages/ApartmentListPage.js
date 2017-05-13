import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ApartmentList from './../components/ApartmentList';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getApartmentListData,
  getApartmentIsLoading,
  getApartmentIsRequestError,
  getApartmentIsDeleted,
} from './../AddressReducer';

class ApartmentListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
      searchFieldStreet: '',
      searchFieldHouse: '',
      searchFieldApartment: '',
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(AddressAction.findApartments(
      this.state.searchFieldStreet,
      this.state.searchFieldHouse,
      this.state.searchFieldApartment,
      this.state.page,
    ));
  }
  onSearch = (street, house, apartment) => {
    this.setState({
      page: 0,
      searchFieldStreet: street,
      searchFieldHouse: house,
      searchFieldApartment: apartment,
    });
    this.props.dispatch(AddressAction.findApartments(street, house, apartment, 0));
  }
  onChangePage = (page) => {
    this.props.dispatch(AddressAction.findApartments(
      this.state.searchFieldStreet,
      this.state.searchFieldHouse,
      this.state.searchFieldApartment,
      page,
    ));
  }
  onDelete = (object) => {
    this.props.dispatch(AddressAction.deleteApartment(
      object,
      this.state.searchFieldStreet,
      this.state.searchFieldHouse,
      this.state.searchFieldApartment,
      this.getActualPageAfterDelete(),
    ));
  }
  render() {
    if (!this.props.data) return null;
    return (
      <ApartmentList
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
    data: getApartmentListData(state),
    isLoading: getApartmentIsLoading(state),
    isRequestError: getApartmentIsRequestError(state),
    isDeleted: getApartmentIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(ApartmentListPage));
