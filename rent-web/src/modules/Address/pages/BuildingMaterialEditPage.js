import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import BuildingMaterialEdit from './../components/BuildingMaterialEdit';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getBuildingMaterialEditData,
  getBuildingMaterialIsLoading,
  getBuildingMaterialIsRequestError,
  getBuildingMaterialIsSaved,
} from './../AddressReducer';

class BuildingMaterialEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AddressAction.getBuildingMaterial(id));
    } else {
      this.props.dispatch(AddressAction.newBuildingMaterial());
    }
  }
  onSave = (object) => {
    this.props.dispatch(AddressAction.saveBuildingMaterial(object));
  };
  render() {
    return (
      <BuildingMaterialEdit
        data={this.props.data}
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
    data: getBuildingMaterialEditData(state),
    isLoading: getBuildingMaterialIsLoading(state),
    isRequestError: getBuildingMaterialIsRequestError(state),
    isSaved: getBuildingMaterialIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(BuildingMaterialEditPage));
