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
      searchFieldStreetName: '',
      searchFieldBuildingName: '',
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(AddressAction.findApartmentsByStreetNameAndBuildingName(this.state.searchFieldStreetName, this.state.searchFieldBuildingName, this.state.page));
  }
  onSearch = (streetName, buildingName) => {
    this.setState({
      page: 0,
      searchFieldStreetName: streetName,
      searchFieldBuildingName: buildingName,
    });
    this.props.dispatch(AddressAction.findApartmentsByStreetNameAndBuildingName(streetName, buildingName, 0));
  }
  onChangePage = (page) => {
    this.props.dispatch(AddressAction.findApartmentsByStreetNameAndBuildingName(this.state.searchFieldStreetName, this.state.searchFieldBuildingName, page));
  };
  onDelete = (object) => {
    this.props.dispatch(AddressAction.deleteApartment(object));
  };
  render() {
    return (
      <ApartmentList
        data={this.props.data}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
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
