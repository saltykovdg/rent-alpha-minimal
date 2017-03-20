import * as MeterTypeAction from './../actions/MeterTypeAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

export const meterTypeReducer = (state, action) => {
  switch (action.type) {
    case MeterTypeAction.GET_METER_TYPE:
    case MeterTypeAction.SAVE_METER_TYPE: {
      return prepareEdit(state.meterType.edit.data, true, false, false, false);
    }
    case MeterTypeAction.FIND_METER_TYPES_BY_NAME:
    case MeterTypeAction.GET_METER_TYPES:
    case MeterTypeAction.DELETE_METER_TYPE: {
      return prepareList(state.meterType.list.data, emptyEditData, true, false, false, false);
    }

    case MeterTypeAction.GET_METER_TYPE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case MeterTypeAction.GET_METER_TYPES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case MeterTypeAction.GET_METER_TYPE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case MeterTypeAction.GET_METER_TYPES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case MeterTypeAction.SAVE_METER_TYPE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case MeterTypeAction.DELETE_METER_TYPE_SUCCESS: {
      return prepareList(state.meterType.list.data, emptyEditData, false, false, false, true);
    }

    case MeterTypeAction.SAVE_METER_TYPE_FAILED: {
      return prepareEdit(state.meterType.edit.data, false, true, false, false);
    }
    case MeterTypeAction.DELETE_METER_TYPE_FAILED: {
      return prepareList(state.meterType.list.data, emptyEditData, false, true, false, false);
    }

    case MeterTypeAction.NEW_METER_TYPE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.meterType.list, emptyEditData);
  }
};

/* Selectors */
export const getMeterTypeEditData = state => state.constants.meterType.edit.data;
export const getMeterTypeListData = state => state.constants.meterType.list.data;
export const getMeterTypeIsLoading = state => state.constants.meterType.list.isLoading || state.constants.meterType.edit.isLoading;
export const getMeterTypeIsRequestError = state => state.constants.meterType.list.isRequestError || state.constants.meterType.edit.isRequestError;
export const getMeterTypeIsSaved = state => state.constants.meterType.isSaved;
export const getMeterTypeIsDeleted = state => state.constants.meterType.isDeleted;
