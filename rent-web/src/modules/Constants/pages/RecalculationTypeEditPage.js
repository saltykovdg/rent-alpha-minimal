import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import RecalculationTypeEdit from './../components/RecalculationTypeEdit';

// Import Actions
import * as RecalculationTypeAction from './../actions/RecalculationTypeAction';

// Import Selectors
import {
  getRecalculationTypeEditData,
  getRecalculationTypeIsLoading,
  getRecalculationTypeIsRequestError,
  getRecalculationTypeIsSaved,
} from './../reducers/RecalculationTypeReducer';

class RecalculationTypeEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(RecalculationTypeAction.getRecalculationType(id));
    } else {
      this.props.dispatch(RecalculationTypeAction.newRecalculationType());
    }
  }
  onSave = (object) => {
    this.props.dispatch(RecalculationTypeAction.saveRecalculationType(object));
  };
  render() {
    return (
      <RecalculationTypeEdit
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
    data: getRecalculationTypeEditData(state),
    isLoading: getRecalculationTypeIsLoading(state),
    isRequestError: getRecalculationTypeIsRequestError(state),
    isSaved: getRecalculationTypeIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(RecalculationTypeEditPage));
