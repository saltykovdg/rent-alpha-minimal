import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import BuildingEdit from './../components/BuildingEdit';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getStreetListData,
  getBuildingEditData,
  getIsLoading,
  getIsRequestError,
  getBuildingIsSaved,
} from './../AddressReducer';

class BuildingEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AddressAction.getBuilding(id));
    } else {
      this.props.dispatch(AddressAction.newBuilding());
    }
  }
  onSave = (object) => {
    this.props.dispatch(AddressAction.saveBuilding(object));
  };
  render() {
    return (
      <BuildingEdit
        data={this.props.data}
        streets={this.props.streets}
        id={this.props.id}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        onSave={this.onSave}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getBuildingEditData(state),
    streets: getStreetListData(state),
    isLoading: getIsLoading(state),
    isRequestError: getIsRequestError(state),
    isSaved: getBuildingIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(BuildingEditPage));
