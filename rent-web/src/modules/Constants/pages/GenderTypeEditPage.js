import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import GenderTypeEdit from './../components/GenderTypeEdit';

// Import Actions
import * as GenderTypeAction from './../actions/GenderTypeAction';

// Import Selectors
import {
  getGenderTypeEditData,
  getGenderTypeIsLoading,
  getGenderTypeIsRequestError,
  getGenderTypeIsSaved,
} from './../reducers/GenderTypeReducer';

class GenderTypeEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(GenderTypeAction.getGenderType(id));
    } else {
      this.props.dispatch(GenderTypeAction.newGenderType());
    }
  }
  onSave = (object) => {
    this.props.dispatch(GenderTypeAction.saveGenderType(object));
  };
  render() {
    if (!this.props.data) return null;
    return (
      <GenderTypeEdit
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
    data: getGenderTypeEditData(state),
    isLoading: getGenderTypeIsLoading(state),
    isRequestError: getGenderTypeIsRequestError(state),
    isSaved: getGenderTypeIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(GenderTypeEditPage));
