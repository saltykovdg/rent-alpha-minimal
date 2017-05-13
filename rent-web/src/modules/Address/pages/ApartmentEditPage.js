import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ApartmentEdit from './../components/ApartmentEdit';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getStreetListData,
  getBuildingListData,
  getApartmentEditData,
  getIsLoading,
  getIsRequestError,
  getApartmentIsSaved,
} from './../AddressReducer';

class ApartmentEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AddressAction.getApartment(id));
    } else {
      this.props.dispatch(AddressAction.newApartment());
    }
  }
  onSave = (object) => {
    this.props.dispatch(AddressAction.saveApartment(object));
  };
  onStreetChange = (streetId) => {
    this.props.dispatch(AddressAction.findBuildingsByStreetId(streetId));
  };
  render() {
    if (!this.props.data) return null;
    return (
      <ApartmentEdit
        data={this.props.data}
        streets={this.props.streets}
        buildings={this.props.buildings}
        id={this.props.id}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isSaved={this.props.isSaved}
        onSave={this.onSave}
        onStreetChange={this.onStreetChange}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getApartmentEditData(state),
    streets: getStreetListData(state),
    buildings: getBuildingListData(state),
    isLoading: getIsLoading(state),
    isRequestError: getIsRequestError(state),
    isSaved: getApartmentIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(ApartmentEditPage));
