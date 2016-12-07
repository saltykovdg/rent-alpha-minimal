import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import CalculationTypeEdit from './../components/CalculationTypeEdit';

// Import Actions
import * as CalculationTypeAction from './../actions/CalculationTypeAction';

// Import Selectors
import {
  getCalculationTypeEditData,
  getCalculationTypeIsLoading,
  getCalculationTypeIsRequestError,
  getCalculationTypeIsSaved,
} from './../reducers/CalculationTypeReducer';

class CalculationTypeEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(CalculationTypeAction.getCalculationType(id));
    } else {
      this.props.dispatch(CalculationTypeAction.newCalculationType());
    }
  }
  onSave = (object) => {
    this.props.dispatch(CalculationTypeAction.saveCalculationType(object));
  };
  render() {
    return (
      <CalculationTypeEdit
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
    data: getCalculationTypeEditData(state),
    isLoading: getCalculationTypeIsLoading(state),
    isRequestError: getCalculationTypeIsRequestError(state),
    isSaved: getCalculationTypeIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(CalculationTypeEditPage));
