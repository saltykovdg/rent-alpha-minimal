import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import moment from 'moment';

import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import TariffEdit from './../components/TariffEdit';
import TariffEditValuesForm from './../components/TariffEditValuesForm';

// Import Actions
import * as TariffAction from './../actions/TariffAction';

// Import Selectors
import {
  getTariffEditData,
  getTariffIsLoading,
  getTariffIsRequestError,
  getTariffIsSaved,
  emptyTariffValue,
} from './../reducers/TariffReducer';

import {
  getServiceListData,
  getServiceIsLoading,
  getServiceIsRequestError,
} from './../../Services/reducers/ServiceReducer';

import {
  getCalculationTypeListData,
  getCalculationTypeIsLoading,
  getCalculationTypeIsRequestError,
} from './../../Constants/reducers/CalculationTypeReducer';

import {
  getMeasurementUnitListData,
  getMeasurementUnitIsLoading,
  getMeasurementUnitIsRequestError,
} from './../../Constants/reducers/MeasurementUnitReducer';

import * as ObjectUtil from './../../../util/ObjectUtil';

class TariffEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(TariffAction.getTariff(id));
    } else {
      this.props.dispatch(TariffAction.newTariff());
    }
    this.initFormTariffValue(false);
  }
  initFormTariffValue = (visible, tariffValue = emptyTariffValue) => {
    this.setState({
      formTariffValueEditVisible: visible, tariffValue: ObjectUtil.cloneObject(tariffValue),
    });
  }
  onSave = (object) => {
    const newObject = object;
    newObject.values = this.props.data.values;
    this.props.dispatch(TariffAction.saveTariff(newObject));
  };
  showFormTariffValueEdit = (tariffValue = emptyTariffValue) => {
    this.initFormTariffValue(true, tariffValue);
  };
  onOkFormTariffValueEdit = (tariffValue) => {
    this.initFormTariffValue(false, tariffValue);
    if (tariffValue.id) {
      this.props.dispatch(TariffAction.editValueInTariff(ObjectUtil.cloneObject(tariffValue)));
    } else {
      const newTariffValue = ObjectUtil.cloneObject(tariffValue);
      newTariffValue.id = moment().unix();
      this.props.dispatch(TariffAction.addNewValueToTariff(newTariffValue));
    }
  }
  onCancelFormTariffValueEdit = (tariffValue) => {
    this.initFormTariffValue(false, tariffValue);
  }
  onDeleteTariffValue = (tariffValue) => {
    this.props.dispatch(TariffAction.removeValueFromTariff(ObjectUtil.cloneObject(tariffValue)));
    this.forceUpdate();
  }
  render() {
    if (!this.props.data) return null;
    return (
      <div>
        <TariffEdit
          data={this.props.data}
          services={this.props.services}
          id={this.props.id}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
          isSaved={this.props.isSaved}
          onSave={this.onSave}
          showFormTariffValueEdit={this.showFormTariffValueEdit}
          onDeleteTariffValue={this.onDeleteTariffValue}
        />
        <TariffEditValuesForm
          tariffValue={this.state.tariffValue}
          calculationTypes={this.props.calculationTypes}
          measurementUnits={this.props.measurementUnits}
          formTariffValueEditVisible={this.state.formTariffValueEditVisible}
          onOkFormTariffValueEdit={this.onOkFormTariffValueEdit}
          onCancelFormTariffValueEdit={this.onCancelFormTariffValueEdit}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getTariffEditData(state),
    services: getServiceListData(state),
    calculationTypes: getCalculationTypeListData(state),
    measurementUnits: getMeasurementUnitListData(state),
    isLoading: getTariffIsLoading(state) || getServiceIsLoading(state) ||
               getCalculationTypeIsLoading(state) || getMeasurementUnitIsLoading(state),
    isRequestError: getTariffIsRequestError(state) || getServiceIsRequestError(state) ||
                    getCalculationTypeIsRequestError(state) || getMeasurementUnitIsRequestError(state),
    isSaved: getTariffIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(TariffEditPage));
