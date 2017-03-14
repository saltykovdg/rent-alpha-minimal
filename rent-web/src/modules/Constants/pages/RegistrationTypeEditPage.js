import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import RegistrationTypeEdit from './../components/RegistrationTypeEdit';

// Import Actions
import * as RegistrationTypeAction from './../actions/RegistrationTypeAction';

// Import Selectors
import {
  getRegistrationTypeEditData,
  getRegistrationTypeIsLoading,
  getRegistrationTypeIsRequestError,
  getRegistrationTypeIsSaved,
} from './../reducers/RegistrationTypeReducer';

class RegistrationTypeEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(RegistrationTypeAction.getRegistrationType(id));
    } else {
      this.props.dispatch(RegistrationTypeAction.newRegistrationType());
    }
  }
  onSave = (object) => {
    this.props.dispatch(RegistrationTypeAction.saveRegistrationType(object));
  };
  render() {
    return (
      <RegistrationTypeEdit
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
    data: getRegistrationTypeEditData(state),
    isLoading: getRegistrationTypeIsLoading(state),
    isRequestError: getRegistrationTypeIsRequestError(state),
    isSaved: getRegistrationTypeIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(RegistrationTypeEditPage));
