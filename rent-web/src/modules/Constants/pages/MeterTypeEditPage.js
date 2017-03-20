import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import MeterTypeEdit from './../components/MeterTypeEdit';

// Import Actions
import * as MeterTypeAction from './../actions/MeterTypeAction';

// Import Selectors
import {
  getMeterTypeEditData,
  getMeterTypeIsLoading,
  getMeterTypeIsRequestError,
  getMeterTypeIsSaved,
} from './../reducers/MeterTypeReducer';

class MeterTypeEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(MeterTypeAction.getMeterType(id));
    } else {
      this.props.dispatch(MeterTypeAction.newMeterType());
    }
  }
  onSave = (object) => {
    this.props.dispatch(MeterTypeAction.saveMeterType(object));
  };
  render() {
    return (
      <MeterTypeEdit
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
    data: getMeterTypeEditData(state),
    isLoading: getMeterTypeIsLoading(state),
    isRequestError: getMeterTypeIsRequestError(state),
    isSaved: getMeterTypeIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(MeterTypeEditPage));
