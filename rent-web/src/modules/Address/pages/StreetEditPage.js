import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import StreetEdit from './../components/StreetEdit';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getStreetTypeListData,
  getStreetEditData,
  getIsLoading,
  getIsRequestError,
  getStreetIsSaved,
} from './../AddressReducer';

class StreetEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AddressAction.getStreet(id));
    } else {
      this.props.dispatch(AddressAction.newStreet());
    }
  }
  onSave = (object) => {
    this.props.dispatch(AddressAction.saveStreet(object));
  };
  render() {
    if (!this.props.data) return null;
    return (
      <StreetEdit
        data={this.props.data}
        streetTypes={this.props.streetTypes}
        id={this.props.id}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isSaved={this.props.isSaved}
        onSave={this.onSave}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getStreetEditData(state),
    streetTypes: getStreetTypeListData(state),
    isLoading: getIsLoading(state),
    isRequestError: getIsRequestError(state),
    isSaved: getStreetIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(StreetEditPage));
