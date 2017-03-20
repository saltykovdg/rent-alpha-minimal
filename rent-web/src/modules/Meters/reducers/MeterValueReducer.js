import * as MeterValueAction from './../actions/MeterValueAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const meterValueReducer = (state, action) => {
  switch (action.type) {
    case MeterValueAction.GET_METER_VALUE:
    case MeterValueAction.SAVE_METER_VALUE: {
      return prepareEdit(state.meterValue.edit.data, true, false, false, false);
    }
    case MeterValueAction.GET_METER_VALUES:
    case MeterValueAction.DELETE_METER_VALUE: {
      return prepareList(state.meterValue.list.data, emptyEditData, true, false, false, false);
    }

    case MeterValueAction.GET_METER_VALUE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case MeterValueAction.GET_METER_VALUES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case MeterValueAction.GET_METER_VALUE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case MeterValueAction.GET_METER_VALUES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case MeterValueAction.SAVE_METER_VALUE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case MeterValueAction.DELETE_METER_VALUE_SUCCESS: {
      return prepareList(state.meterValue.list.data, emptyEditData, false, false, false, true);
    }

    case MeterValueAction.SAVE_METER_VALUE_FAILED: {
      return prepareEdit(state.meterValue.edit.data, false, true, false, false);
    }
    case MeterValueAction.DELETE_METER_VALUE_FAILED: {
      return prepareList(state.meterValue.list.data, emptyEditData, false, true, false, false);
    }

    case MeterValueAction.NEW_METER_VALUE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.meterValue.list, emptyEditData);
  }
};

/* Selectors */
export const getMeterValueEditData = state => state.meters.meterValue.edit.data;
export const getMeterValueListData = state => state.meters.meterValue.list.data;
export const getMeterValueIsLoading = state => state.meters.meterValue.list.isLoading || state.meters.meterValue.edit.isLoading;
export const getMeterValueIsRequestError = state => state.meters.meterValue.list.isRequestError || state.meters.meterValue.edit.isRequestError;
export const getMeterValueIsSaved = state => state.meters.meterValue.isSaved;
export const getMeterValueIsDeleted = state => state.meters.meterValue.isDeleted;
