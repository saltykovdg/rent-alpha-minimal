import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import moment from 'moment';

// Import Components
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';
import BuildingEdit from './../components/BuildingEdit';
import EditTiedMeterForm from './../../../components/EditTiedMeterForm';

// Import Actions
import * as AddressAction from './../AddressActions';
import * as MeterAction from './../../Meters/actions/MeterAction';

// Import Selectors
import {
  getStreetListData,
  getBuildingEditData,
  getIsLoading,
  getIsRequestError,
  getBuildingIsSaved,
} from './../AddressReducer';

import {
  emptyMeter,
} from './../reducers/BuildingReducer';

import {
  getMeterListData,
  getMeterIsLoading,
  getMeterIsRequestError,
} from './../../Meters/reducers/MeterReducer';

import * as ObjectUtil from './../../../util/ObjectUtil';

class BuildingEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AddressAction.getBuilding(id));
    } else {
      this.props.dispatch(AddressAction.newBuilding());
    }
    this.clearLocalDataMeters();
    this.initFormMeter(false);
  }
  initFormMeter = (visible, meter = emptyMeter) => {
    this.setState({
      formMeterEditVisible: visible, meter: ObjectUtil.cloneObject(meter),
    });
  }
  clearLocalDataMeters = () => {
    this.props.dispatch(MeterAction.clearLocalDataMeters());
  }
  onSave = (object) => {
    const newObject = ObjectUtil.cloneObject(object);
    newObject.meters = this.props.data.meters;
    this.props.dispatch(AddressAction.saveBuilding(newObject));
  };
  showFormMeterEdit = (meter = emptyMeter) => {
    this.initFormMeter(true, meter);
  }
  onOkFormMeterEdit = (meter) => {
    this.initFormMeter(false, meter);
    if (meter.id) {
      this.props.dispatch(AddressAction.editMeterInBuilding(ObjectUtil.cloneObject(meter)));
    } else {
      const newMeter = ObjectUtil.cloneObject(meter);
      newMeter.id = moment().unix();
      this.props.dispatch(AddressAction.addNewMeterToBuilding(newMeter));
    }
  }
  onCancelFormMeterEdit = (meter) => {
    this.initFormMeter(false, meter);
  }
  onDeleteMeter = (meter) => {
    this.props.dispatch(AddressAction.removeMeterFromBuilding(ObjectUtil.cloneObject(meter)));
    this.forceUpdate();
  }
  onSearchMeters = (service, name, serialNumber, page, size) => {
    this.props.dispatch(MeterAction.findMetersCommonHouse(service, name, serialNumber, page, size));
  }
  render() {
    return (
      <div>
        <BuildingEdit
          data={this.props.data}
          streets={this.props.streets}
          id={this.props.id}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
          isSaved={this.props.isSaved}
          onSave={this.onSave}
          showFormMeterEdit={this.showFormMeterEdit}
          onDeleteMeter={this.onDeleteMeter}
        />
        <EditTiedMeterForm
          isLoading={this.props.isLoadingMeters}
          tiedMeter={this.state.meter}
          meters={this.props.meters}
          formMeterEditVisible={this.state.formMeterEditVisible}
          onOkFormMeterEdit={this.onOkFormMeterEdit}
          onCancelFormMeterEdit={this.onCancelFormMeterEdit}
          onSearchMeters={this.onSearchMeters}
          clearLocalDataMeters={this.clearLocalDataMeters}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getBuildingEditData(state),
    streets: getStreetListData(state),
    meters: getMeterListData(state),
    isLoading: getIsLoading(state),
    isLoadingMeters: getMeterIsLoading(state),
    isRequestError: getIsRequestError(state) || getMeterIsRequestError(state),
    isSaved: getBuildingIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(BuildingEditPage));
