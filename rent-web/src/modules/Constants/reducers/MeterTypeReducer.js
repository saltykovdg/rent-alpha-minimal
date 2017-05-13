import * as MeterTypeAction from './../actions/MeterTypeAction';
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
  name: '',
};

export const meterTypeReducer = (state, action) => {
  switch (action.type) {
    case MeterTypeAction.GET_METER_TYPE: {
      return prepareEditLoading(state.meterType.list.data, emptyEditData);
    }
    case MeterTypeAction.SAVE_METER_TYPE: {
      return prepareEditLoading(state.meterType.list.data, state.meterType.edit.data);
    }
    case MeterTypeAction.FIND_METER_TYPES_BY_NAME:
    case MeterTypeAction.GET_METER_TYPES:
    case MeterTypeAction.DELETE_METER_TYPE: {
      return prepareListLoading(state.meterType.list.data, emptyEditData);
    }

    case MeterTypeAction.GET_METER_TYPE_SUCCESS: {
      return prepareSuccess(state.meterType.list.data, action.data);
    }
    case MeterTypeAction.GET_METER_TYPES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case MeterTypeAction.GET_METER_TYPE_FAILED: {
      return prepareEditFailed(state.meterType.list.data, emptyEditData);
    }
    case MeterTypeAction.GET_METER_TYPES_FAILED: {
      return prepareListFailed(state.meterType.list.data, emptyEditData);
    }

    case MeterTypeAction.SAVE_METER_TYPE_SUCCESS: {
      return prepareSaveSuccess(state.meterType.list.data, emptyEditData);
    }
    case MeterTypeAction.DELETE_METER_TYPE_SUCCESS: {
      return prepareDeleteSuccess(state.meterType.list.data, emptyEditData);
    }

    case MeterTypeAction.SAVE_METER_TYPE_FAILED: {
      return prepareEditFailed(state.meterType.list.data, state.meterType.edit.data);
    }
    case MeterTypeAction.DELETE_METER_TYPE_FAILED: {
      return prepareListFailed(state.meterType.list.data, emptyEditData);
    }

    case MeterTypeAction.NEW_METER_TYPE: {
      return prepareSuccess(state.meterType.list.data, emptyEditData);
    }

    default:
      return state.meterType;
  }
};

/* Selectors */
export const getMeterTypeEditData = state => state.constants.meterType.edit.data;
export const getMeterTypeListData = state => state.constants.meterType.list.data;
export const getMeterTypeIsLoading = state => state.constants.meterType.list.isLoading || state.constants.meterType.edit.isLoading;
export const getMeterTypeIsRequestError = state => state.constants.meterType.list.isRequestError || state.constants.meterType.edit.isRequestError;
export const getMeterTypeIsSaved = state => state.constants.meterType.isSaved;
export const getMeterTypeIsDeleted = state => state.constants.meterType.isDeleted;
