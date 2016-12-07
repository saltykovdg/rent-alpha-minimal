import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import AccountEdit from './../components/AccountEdit';

// Import Actions
import * as AccountAction from './../actions/AccountAction';
import * as AddressAction from './../../Address/AddressActions';

// Import Selectors
import {
  getAccountEditData,
  getAccountIsLoading,
  getAccountIsRequestError,
  getAccountIsSaved,
} from './../reducers/AccountReducer';

import {
  getStreetListData,
  getBuildingListData,
  getApartmentListData,
  getIsLoading as getIsLoadingAddress,
  getIsRequestError as getIsRequestErrorAddress,
} from './../../Address/AddressReducer';

import {
  getContractorListData,
  getContractorIsLoading,
  getContractorIsRequestError,
} from './../../Organization/OrganizationReducer';

class AccountEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AccountAction.getAccount(id));
    } else {
      this.props.dispatch(AccountAction.newAccount());
    }
  }
  onSave = (object) => {
    this.props.dispatch(AccountAction.saveAccount(object));
  };
  onStreetChange = (streetId) => {
    this.props.dispatch(AddressAction.findBuildingsByStreetId(streetId));
  };
  onBuildingChange = (buildingId) => {
    this.props.dispatch(AddressAction.findApartmentsByBuildingId(buildingId));
  };
  render() {
    return (
      <AccountEdit
        data={this.props.data}
        contractors={this.props.contractors}
        streets={this.props.streets}
        buildings={this.props.buildings}
        apartments={this.props.apartments}
        id={this.props.id}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isSaved={this.props.isSaved}
        onSave={this.onSave}
        onStreetChange={this.onStreetChange}
        onBuildingChange={this.onBuildingChange}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getAccountEditData(state),
    contractors: getContractorListData(state),
    streets: getStreetListData(state),
    buildings: getBuildingListData(state),
    apartments: getApartmentListData(state),
    isLoading: getAccountIsLoading(state) || getIsLoadingAddress(state) || getContractorIsLoading(state),
    isRequestError: getAccountIsRequestError(state) || getIsRequestErrorAddress(state) || getContractorIsRequestError(state),
    isSaved: getAccountIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(AccountEditPage));
