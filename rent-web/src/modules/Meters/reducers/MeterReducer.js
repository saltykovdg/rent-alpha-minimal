import * as MeterAction from './../actions/MeterAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

export const emptyMeterValue = {
  id: '',
  value: 0,
  consumption: 0,
  dateValue: null,
};

const emptyEditData = {
  id: '',
  name: '',
  serialNumber: '',
  values: [],
};

const calculateConsumption = (meter) => {
  const newObj = meter;
  newObj.values = meter.values.sort((a, b) => {
    return new Date(a.dateValue) - new Date(b.dateValue);
  });
  for (let i = 0; i < newObj.values.length; i += 1) {
    const newItem = newObj.values[i];
    if (i === 0) {
      newItem.consumption = 0;
    } else {
      const prevItem = newObj.values[i - 1];
      newItem.consumption = parseFloat((newItem.value - prevItem.value).toFixed(6));
    }
  }
};

export const meterReducer = (state, action) => {
  switch (action.type) {
    case MeterAction.GET_METER: {
      return prepareEditLoading(state.meter.list.data, emptyEditData);
    }
    case MeterAction.SAVE_METER: {
      return prepareEditLoading(state.meter.list.data, state.meter.edit.data);
    }
    case MeterAction.FIND_METERS:
    case MeterAction.FIND_METERS_INDIVIDUAL:
    case MeterAction.FIND_METERS_COMMON_HOUSE:
    case MeterAction.GET_METERS:
    case MeterAction.DELETE_METER: {
      return prepareListLoading(state.meter.list.data, emptyEditData);
    }

    case MeterAction.GET_METER_SUCCESS: {
      return prepareSuccess(state.meter.list.data, action.data);
    }
    case MeterAction.GET_METERS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case MeterAction.GET_METER_FAILED: {
      return prepareEditFailed(state.meter.list.data, emptyEditData);
    }
    case MeterAction.GET_METERS_FAILED: {
      return prepareListFailed(state.meter.list.data, emptyEditData);
    }

    case MeterAction.SAVE_METER_SUCCESS: {
      return prepareSaveSuccess(state.meter.list.data, emptyEditData);
    }
    case MeterAction.DELETE_METER_SUCCESS: {
      return prepareDeleteSuccess(state.meter.list.data, emptyEditData);
    }

    case MeterAction.SAVE_METER_FAILED: {
      return prepareEditFailed(state.meter.list.data, state.meter.edit.data);
    }
    case MeterAction.DELETE_METER_FAILED: {
      return prepareListFailed(state.meter.list.data, emptyEditData);
    }

    case MeterAction.NEW_METER: {
      return prepareSuccess(state.meter.list.data, emptyEditData);
    }

    case MeterAction.ADD_NEW_VALUE_TO_METER: {
      const newObj = state.meter.edit.data;
      newObj.values.push(action.meterValue);
      calculateConsumption(newObj);
      return prepareSuccess(state.meter.list.data, newObj);
    }

    case MeterAction.EDIT_VALUE_IN_METER: {
      const newObj = state.meter.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.meterValue.id);
      newObj.values.push(action.meterValue);
      calculateConsumption(newObj);
      return prepareSuccess(state.meter.list.data, newObj);
    }

    case MeterAction.REMOVE_VALUE_FROM_METER: {
      const newObj = state.meter.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.meterValue.id);
      calculateConsumption(newObj);
      return prepareSuccess(state.meter.list.data, newObj);
    }

    case MeterAction.CLEAR_LOCAL_DATA_METERS: {
      return prepareSuccess(null, emptyEditData);
    }

    default:
      return state.meter;
  }
};

/* Selectors */
export const getMeterEditData = state => state.meters.meter.edit.data;
export const getMeterListData = state => state.meters.meter.list.data;
export const getMeterIsLoading = state => state.meters.meter.list.isLoading || state.meters.meter.edit.isLoading;
export const getMeterIsRequestError = state => state.meters.meter.list.isRequestError || state.meters.meter.edit.isRequestError;
export const getMeterIsSaved = state => state.meters.meter.isSaved;
export const getMeterIsDeleted = state => state.meters.meter.isDeleted;
