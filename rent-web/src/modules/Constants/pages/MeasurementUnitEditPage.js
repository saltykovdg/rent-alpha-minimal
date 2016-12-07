import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import MeasurementUnitEdit from './../components/MeasurementUnitEdit';

// Import Actions
import * as MeasurementUnitAction from './../actions/MeasurementUnitAction';

// Import Selectors
import {
  getMeasurementUnitEditData,
  getMeasurementUnitIsLoading,
  getMeasurementUnitIsRequestError,
  getMeasurementUnitIsSaved,
} from './../reducers/MeasurementUnitReducer';

class MeasurementUnitEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(MeasurementUnitAction.getMeasurementUnit(id));
    } else {
      this.props.dispatch(MeasurementUnitAction.newMeasurementUnit());
    }
  }
  onSave = (object) => {
    this.props.dispatch(MeasurementUnitAction.saveMeasurementUnit(object));
  };
  render() {
    return (
      <MeasurementUnitEdit
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
    data: getMeasurementUnitEditData(state),
    isLoading: getMeasurementUnitIsLoading(state),
    isRequestError: getMeasurementUnitIsRequestError(state),
    isSaved: getMeasurementUnitIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(MeasurementUnitEditPage));
