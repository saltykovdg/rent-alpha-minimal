import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import moment from 'moment';

// Import Components
import NormEdit from './../components/NormEdit';
import NormEditValuesForm from './../components/NormEditValuesForm';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Actions
import * as NormAction from './../actions/NormAction';

// Import Selectors
import {
  getNormEditData,
  getNormIsLoading,
  getNormIsRequestError,
  getNormIsSaved,
  emptyNormValue,
} from './../reducers/NormReducer';

import {
  getServiceListData,
  getServiceIsLoading,
  getServiceIsRequestError,
} from './../../Services/reducers/ServiceReducer';

import {
  getMeasurementUnitListData,
  getMeasurementUnitIsLoading,
  getMeasurementUnitIsRequestError,
} from './../../Constants/reducers/MeasurementUnitReducer';

import * as ObjectUtil from './../../../util/ObjectUtil';

class NormEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(NormAction.getNorm(id));
    } else {
      this.props.dispatch(NormAction.newNorm());
    }
    this.initFormNormValue(false);
  }
  initFormNormValue = (visible, normValue = emptyNormValue) => {
    this.setState({
      formNormValueEditVisible: visible, normValue: ObjectUtil.cloneObject(normValue),
    });
  }
  onSave = (object) => {
    const newObject = object;
    newObject.values = this.props.data.values;
    this.props.dispatch(NormAction.saveNorm(newObject));
  };
  showFormNormValueEdit = (normValue = emptyNormValue) => {
    this.initFormNormValue(true, normValue);
  };
  onOkFormNormValueEdit = (normValue) => {
    this.initFormNormValue(false, normValue);
    if (normValue.id) {
      this.props.dispatch(NormAction.editValueInNorm(ObjectUtil.cloneObject(normValue)));
    } else {
      const newNormValue = ObjectUtil.cloneObject(normValue);
      newNormValue.id = moment().unix();
      this.props.dispatch(NormAction.addNewValueToNorm(newNormValue));
    }
  }
  onCancelFormNormValueEdit = (normValue) => {
    this.initFormNormValue(false, normValue);
  }
  onDeleteNormValue = (normValue) => {
    this.props.dispatch(NormAction.removeValueFromNorm(ObjectUtil.cloneObject(normValue)));
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <NormEdit
          data={this.props.data}
          services={this.props.services}
          id={this.props.id}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
          isSaved={this.props.isSaved}
          onSave={this.onSave}
          showFormNormValueEdit={this.showFormNormValueEdit}
          onDeleteNormValue={this.onDeleteNormValue}
        />
        <NormEditValuesForm
          normValue={this.state.normValue}
          measurementUnits={this.props.measurementUnits}
          formNormValueEditVisible={this.state.formNormValueEditVisible}
          onOkFormNormValueEdit={this.onOkFormNormValueEdit}
          onCancelFormNormValueEdit={this.onCancelFormNormValueEdit}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getNormEditData(state),
    services: getServiceListData(state),
    measurementUnits: getMeasurementUnitListData(state),
    isLoading: getNormIsLoading(state) || getServiceIsLoading(state) ||
               getMeasurementUnitIsLoading(state),
    isRequestError: getNormIsRequestError(state) || getServiceIsRequestError(state) ||
                    getMeasurementUnitIsRequestError(state),
    isSaved: getNormIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(NormEditPage));
