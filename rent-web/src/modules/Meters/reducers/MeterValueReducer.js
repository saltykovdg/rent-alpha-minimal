import * as MeterValueAction from './../actions/MeterValueAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const meterValueReducer = (state, action) => {
  switch (action.type) {
    case MeterValueAction.GET_METER_VALUE: {
      return prepareEditLoading(state.meterValue.list.data, emptyEditData);
    }
    case MeterValueAction.SAVE_METER_VALUE: {
      return prepareEditLoading(state.meterValue.list.data, state.meterValue.edit.data);
    }
    case MeterValueAction.GET_METER_VALUES:
    case MeterValueAction.DELETE_METER_VALUE: {
      return prepareListLoading(state.meterValue.list.data, emptyEditData);
    }

    case MeterValueAction.GET_METER_VALUE_SUCCESS: {
      return prepareSuccess(state.meterValue.list.data, action.data);
    }
    case MeterValueAction.GET_METER_VALUES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case MeterValueAction.GET_METER_VALUE_FAILED: {
      return prepareEditFailed(state.meterValue.list.data, emptyEditData);
    }
    case MeterValueAction.GET_METER_VALUES_FAILED: {
      return prepareListFailed(state.meterValue.list.data, emptyEditData);
    }

    case MeterValueAction.SAVE_METER_VALUE_SUCCESS: {
      return prepareSaveSuccess(state.meterValue.list.data, emptyEditData);
    }
    case MeterValueAction.DELETE_METER_VALUE_SUCCESS: {
      return prepareDeleteSuccess(state.meterValue.list.data, emptyEditData);
    }

    case MeterValueAction.SAVE_METER_VALUE_FAILED: {
      return prepareEditFailed(state.meterValue.list.data, state.meterValue.edit.data);
    }
    case MeterValueAction.DELETE_METER_VALUE_FAILED: {
      return prepareListFailed(state.meterValue.list.data, emptyEditData);
    }

    case MeterValueAction.NEW_METER_VALUE: {
      return prepareSuccess(state.meterValue.list.data, emptyEditData);
    }

    default:
      return state.meterValue;
  }
};

/* Selectors */
export const getMeterValueEditData = state => state.meters.meterValue.edit.data;
export const getMeterValueListData = state => state.meters.meterValue.list.data;
export const getMeterValueIsLoading = state => state.meters.meterValue.list.isLoading || state.meters.meterValue.edit.isLoading;
export const getMeterValueIsRequestError = state => state.meters.meterValue.list.isRequestError || state.meters.meterValue.edit.isRequestError;
export const getMeterValueIsSaved = state => state.meters.meterValue.isSaved;
export const getMeterValueIsDeleted = state => state.meters.meterValue.isDeleted;
