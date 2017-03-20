import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import moment from 'moment';

// Import Components
import MeterEdit from './../components/MeterEdit';
import MeterEditValuesForm from './../components/MeterEditValuesForm';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Actions
import * as MeterAction from './../actions/MeterAction';

// Import Selectors
import {
  getMeterEditData,
  getMeterIsLoading,
  getMeterIsRequestError,
  getMeterIsSaved,
  emptyMeterValue,
} from './../reducers/MeterReducer';

import {
  getServiceListData,
  getServiceIsLoading,
  getServiceIsRequestError,
} from './../../Services/reducers/ServiceReducer';

import {
  getMeterTypeListData,
  getMeterTypeIsLoading,
  getMeterTypeIsRequestError,
} from './../../Constants/reducers/MeterTypeReducer';

import * as ObjectUtil from './../../../util/ObjectUtil';

class MeterEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(MeterAction.getMeter(id));
    } else {
      this.props.dispatch(MeterAction.newMeter());
    }
    this.initFormMeterValue(false);
  }
  initFormMeterValue = (visible, meterValue = emptyMeterValue) => {
    this.setState({
      formMeterValueEditVisible: visible, meterValue: ObjectUtil.cloneObject(meterValue),
    });
  }
  onSave = (object) => {
    const newObject = object;
    newObject.values = this.props.data.values;
    this.props.dispatch(MeterAction.saveMeter(newObject));
  };
  showFormMeterValueEdit = (meterValue = emptyMeterValue) => {
    this.initFormMeterValue(true, meterValue);
  };
  onOkFormMeterValueEdit = (meterValue = emptyMeterValue) => {
    this.initFormMeterValue(false);
    if (meterValue.id) {
      this.props.dispatch(MeterAction.editValueInMeter(ObjectUtil.cloneObject(meterValue)));
    } else {
      const newMeterValue = ObjectUtil.cloneObject(meterValue);
      newMeterValue.id = moment().unix();
      this.props.dispatch(MeterAction.addNewValueToMeter(newMeterValue));
    }
  }
  onCancelFormMeterValueEdit = () => {
    this.initFormMeterValue(false);
  }
  onDeleteMeterValue = (meterValue) => {
    this.props.dispatch(MeterAction.removeValueFromMeter(ObjectUtil.cloneObject(meterValue)));
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <MeterEdit
          data={this.props.data}
          services={this.props.services}
          meterTypes={this.props.meterTypes}
          id={this.props.id}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
          isSaved={this.props.isSaved}
          onSave={this.onSave}
          showFormMeterValueEdit={this.showFormMeterValueEdit}
          onDeleteMeterValue={this.onDeleteMeterValue}
        />
        <MeterEditValuesForm
          meterValue={this.state.meterValue}
          formMeterValueEditVisible={this.state.formMeterValueEditVisible}
          onOkFormMeterValueEdit={this.onOkFormMeterValueEdit}
          onCancelFormMeterValueEdit={this.onCancelFormMeterValueEdit}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getMeterEditData(state),
    services: getServiceListData(state),
    meterTypes: getMeterTypeListData(state),
    isLoading: getMeterIsLoading(state) || getServiceIsLoading(state) || getMeterTypeIsLoading(state),
    isRequestError: getMeterIsRequestError(state) || getServiceIsRequestError(state) || getMeterTypeIsRequestError(state),
    isSaved: getMeterIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(MeterEditPage));
