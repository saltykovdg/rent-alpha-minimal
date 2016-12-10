import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ParameterTypeEdit from './../components/ParameterTypeEdit';

// Import Actions
import * as ParameterTypeAction from './../actions/ParameterTypeAction';

// Import Selectors
import {
  getParameterTypeEditData,
  getParameterTypeIsLoading,
  getParameterTypeIsRequestError,
  getParameterTypeIsSaved,
} from './../reducers/ParameterTypeReducer';

class ParameterTypeEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(ParameterTypeAction.getParameterType(id));
    } else {
      this.props.dispatch(ParameterTypeAction.newParameterType());
    }
  }
  onSave = (object) => {
    this.props.dispatch(ParameterTypeAction.saveParameterType(object));
  };
  render() {
    return (
      <ParameterTypeEdit
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
    data: getParameterTypeEditData(state),
    isLoading: getParameterTypeIsLoading(state),
    isRequestError: getParameterTypeIsRequestError(state),
    isSaved: getParameterTypeIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(ParameterTypeEditPage));
