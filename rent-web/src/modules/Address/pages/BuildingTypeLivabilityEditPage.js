import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import BuildingTypeLivabilityEdit from './../components/BuildingTypeLivabilityEdit';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getBuildingTypeLivabilityEditData,
  getBuildingTypeLivabilityIsLoading,
  getBuildingTypeLivabilityIsRequestError,
  getBuildingTypeLivabilityIsSaved,
} from './../AddressReducer';

class BuildingTypeLivabilityEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AddressAction.getBuildingTypeLivability(id));
    } else {
      this.props.dispatch(AddressAction.newBuildingTypeLivability());
    }
  }
  onSave = (object) => {
    this.props.dispatch(AddressAction.saveBuildingTypeLivability(object));
  };
  render() {
    return (
      <BuildingTypeLivabilityEdit
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
    data: getBuildingTypeLivabilityEditData(state),
    isLoading: getBuildingTypeLivabilityIsLoading(state),
    isRequestError: getBuildingTypeLivabilityIsRequestError(state),
    isSaved: getBuildingTypeLivabilityIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(BuildingTypeLivabilityEditPage));
