import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import StreetTypeEdit from './../components/StreetTypeEdit';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getStreetTypeEditData,
  getStreetTypeIsLoading,
  getStreetTypeIsRequestError,
  getStreetTypeIsSaved,
} from './../AddressReducer';

class StreetTypeEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AddressAction.getStreetType(id));
    } else {
      this.props.dispatch(AddressAction.newStreetType());
    }
  }
  onSave = (object) => {
    this.props.dispatch(AddressAction.saveStreetType(object));
  };
  render() {
    return (
      <StreetTypeEdit
        data={this.props.data}
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
    data: getStreetTypeEditData(state),
    isLoading: getStreetTypeIsLoading(state),
    isRequestError: getStreetTypeIsRequestError(state),
    isSaved: getStreetTypeIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(StreetTypeEditPage));
