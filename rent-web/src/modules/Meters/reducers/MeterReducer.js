import moment from 'moment';

import * as MeterAction from './../actions/MeterAction';
import * as MeterValueAction from './../actions/MeterValueAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

export const emptyMeterValue = {
  id: '',
  value: 0,
  consumption: 0,
  dateValue: moment(),
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
      newItem.consumption = newItem.value - prevItem.value;
    }
  }
};

export const meterReducer = (state, action) => {
  switch (action.type) {
    case MeterAction.GET_METER:
    case MeterAction.SAVE_METER: {
      return prepareEdit(state.meter.edit.data, true, false, false, false);
    }
    case MeterAction.FIND_METERS:
    case MeterAction.FIND_METERS_INDIVIDUAL:
    case MeterAction.FIND_METERS_COMMON_HOUSE:
    case MeterAction.GET_METERS:
    case MeterAction.DELETE_METER: {
      return prepareList(state.meter.list.data, emptyEditData, true, false, false, false);
    }

    case MeterAction.GET_METER_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case MeterAction.GET_METERS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case MeterAction.GET_METER_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case MeterAction.GET_METERS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case MeterAction.SAVE_METER_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case MeterAction.DELETE_METER_SUCCESS: {
      return prepareList(state.meter.list.data, emptyEditData, false, false, false, true);
    }

    case MeterAction.SAVE_METER_FAILED: {
      return prepareEdit(state.meter.edit.data, false, true, false, false);
    }
    case MeterAction.DELETE_METER_FAILED: {
      return prepareList(state.meter.list.data, emptyEditData, false, true, false, false);
    }

    case MeterAction.NEW_METER: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    case MeterAction.ADD_NEW_VALUE_TO_METER: {
      const newObj = state.meter.edit.data;
      newObj.values.push(action.meterValue);
      calculateConsumption(newObj);
      return prepareEdit(newObj, false, false, false, false);
    }

    case MeterAction.EDIT_VALUE_IN_METER: {
      const newObj = state.meter.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.meterValue.id);
      newObj.values.push(action.meterValue);
      calculateConsumption(newObj);
      return prepareEdit(newObj, false, false, false, false);
    }

    case MeterAction.REMOVE_VALUE_FROM_METER: {
      const newObj = state.meter.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.meterValue.id);
      calculateConsumption(newObj);
      return prepareEdit(newObj, false, false, false, false);
    }

    case MeterValueAction.SAVE_METER_VALUE:
    case MeterValueAction.SAVE_METER_VALUE_SUCCESS:
    case MeterValueAction.SAVE_METER_VALUE_FAILED: {
      return state.meter;
    }

    case MeterAction.CLEAR_LOCAL_DATA_METERS: {
      return prepareList(null, emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.meter.list, emptyEditData);
  }
};

/* Selectors */
export const getMeterEditData = state => state.meters.meter.edit.data;
export const getMeterListData = state => state.meters.meter.list.data;
export const getMeterIsLoading = state => state.meters.meter.list.isLoading || state.meters.meter.edit.isLoading;
export const getMeterIsRequestError = state => state.meters.meter.list.isRequestError || state.meters.meter.edit.isRequestError;
export const getMeterIsSaved = state => state.meters.meter.isSaved;
export const getMeterIsDeleted = state => state.meters.meter.isDeleted;
