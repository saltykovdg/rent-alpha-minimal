import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import BuildingList from './../components/BuildingList';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getBuildingListData,
  getBuildingIsLoading,
  getBuildingIsRequestError,
  getBuildingIsDeleted,
} from './../AddressReducer';

class BuildingListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
      searchFieldStreet: '',
      searchFieldHouse: '',
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(AddressAction.findBuildings(
      this.state.searchFieldStreet,
      this.state.searchFieldHouse,
      this.state.page,
    ));
  }
  onSearch = (street, house) => {
    this.setState({
      page: 0,
      searchFieldStreet: street,
      searchFieldHouse: house,
    });
    this.props.dispatch(AddressAction.findBuildings(street, house, 0));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(AddressAction.findBuildings(
      this.state.searchFieldStreet,
      this.state.searchFieldHouse,
      page,
    ));
  };
  onDelete = (object) => {
    this.props.dispatch(AddressAction.deleteBuilding(
      object,
      this.state.searchFieldStreet,
      this.state.searchFieldHouse,
      this.getActualPageAfterDelete(),
    ));
  };
  render() {
    return (
      <BuildingList
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
    data: getBuildingListData(state),
    isLoading: getBuildingIsLoading(state),
    isRequestError: getBuildingIsRequestError(state),
    isDeleted: getBuildingIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(BuildingListPage));
