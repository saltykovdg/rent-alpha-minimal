import * as MeasurementUnitAction from './../actions/MeasurementUnitAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
  nameOrigin: '',
};

export const measurementUnitReducer = (state, action) => {
  switch (action.type) {
    case MeasurementUnitAction.GET_MEASUREMENT_UNIT:
    case MeasurementUnitAction.SAVE_MEASUREMENT_UNIT: {
      return prepareEdit(state.measurementUnit.edit.data, true, false, false, false);
    }
    case MeasurementUnitAction.FIND_MEASUREMENT_UNITS_BY_NAME:
    case MeasurementUnitAction.GET_MEASUREMENT_UNITS:
    case MeasurementUnitAction.DELETE_MEASUREMENT_UNIT: {
      return prepareList(state.measurementUnit.list.data, emptyEditData, true, false, false, false);
    }

    case MeasurementUnitAction.GET_MEASUREMENT_UNIT_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case MeasurementUnitAction.GET_MEASUREMENT_UNITS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case MeasurementUnitAction.GET_MEASUREMENT_UNIT_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case MeasurementUnitAction.GET_MEASUREMENT_UNITS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case MeasurementUnitAction.SAVE_MEASUREMENT_UNIT_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case MeasurementUnitAction.DELETE_MEASUREMENT_UNIT_SUCCESS: {
      return prepareList(state.measurementUnit.list.data, emptyEditData, false, false, false, true);
    }

    case MeasurementUnitAction.SAVE_MEASUREMENT_UNIT_FAILED: {
      return prepareEdit(state.measurementUnit.edit.data, false, true, false, false);
    }
    case MeasurementUnitAction.DELETE_MEASUREMENT_UNIT_FAILED: {
      return prepareList(state.measurementUnit.list.data, emptyEditData, false, true, false, false);
    }

    case MeasurementUnitAction.NEW_MEASUREMENT_UNIT: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.measurementUnit.list, emptyEditData);
  }
};

/* Selectors */
export const getMeasurementUnitEditData = state => state.constants.measurementUnit.edit.data;
export const getMeasurementUnitListData = state => state.constants.measurementUnit.list.data;
export const getMeasurementUnitIsLoading = state => state.constants.measurementUnit.list.isLoading || state.constants.measurementUnit.edit.isLoading;
export const getMeasurementUnitIsRequestError = state => state.constants.measurementUnit.list.isRequestError || state.constants.measurementUnit.edit.isRequestError;
export const getMeasurementUnitIsSaved = state => state.constants.measurementUnit.isSaved;
export const getMeasurementUnitIsDeleted = state => state.constants.measurementUnit.isDeleted;
