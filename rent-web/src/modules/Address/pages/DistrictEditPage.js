import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import DistrictEdit from './../components/DistrictEdit';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getDistrictEditData,
  getDistrictIsLoading,
  getDistrictIsRequestError,
  getDistrictIsSaved,
} from './../AddressReducer';

class DistrictEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AddressAction.getDistrict(id));
    } else {
      this.props.dispatch(AddressAction.newDistrict());
    }
  }
  onSave = (object) => {
    this.props.dispatch(AddressAction.saveDistrict(object));
  };
  render() {
    return (
      <DistrictEdit
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
    data: getDistrictEditData(state),
    isLoading: getDistrictIsLoading(state),
    isRequestError: getDistrictIsRequestError(state),
    isSaved: getDistrictIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(DistrictEditPage));
