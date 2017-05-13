import * as MeasurementUnitAction from './../actions/MeasurementUnitAction';
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

export const measurementUnitReducer = (state, action) => {
  switch (action.type) {
    case MeasurementUnitAction.GET_MEASUREMENT_UNIT: {
      return prepareEditLoading(state.measurementUnit.list.data, emptyEditData);
    }
    case MeasurementUnitAction.SAVE_MEASUREMENT_UNIT: {
      return prepareEditLoading(state.measurementUnit.list.data, state.measurementUnit.edit.data);
    }
    case MeasurementUnitAction.FIND_MEASUREMENT_UNITS_BY_NAME:
    case MeasurementUnitAction.GET_MEASUREMENT_UNITS:
    case MeasurementUnitAction.DELETE_MEASUREMENT_UNIT: {
      return prepareListLoading(state.measurementUnit.list.data, emptyEditData);
    }

    case MeasurementUnitAction.GET_MEASUREMENT_UNIT_SUCCESS: {
      return prepareSuccess(state.measurementUnit.list.data, action.data);
    }
    case MeasurementUnitAction.GET_MEASUREMENT_UNITS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case MeasurementUnitAction.GET_MEASUREMENT_UNIT_FAILED: {
      return prepareEditFailed(state.measurementUnit.list.data, emptyEditData);
    }
    case MeasurementUnitAction.GET_MEASUREMENT_UNITS_FAILED: {
      return prepareListFailed(state.measurementUnit.list.data, emptyEditData);
    }

    case MeasurementUnitAction.SAVE_MEASUREMENT_UNIT_SUCCESS: {
      return prepareSaveSuccess(state.measurementUnit.list.data, emptyEditData);
    }
    case MeasurementUnitAction.DELETE_MEASUREMENT_UNIT_SUCCESS: {
      return prepareDeleteSuccess(state.measurementUnit.list.data, emptyEditData);
    }

    case MeasurementUnitAction.SAVE_MEASUREMENT_UNIT_FAILED: {
      return prepareEditFailed(state.measurementUnit.list.data, state.measurementUnit.edit.data);
    }
    case MeasurementUnitAction.DELETE_MEASUREMENT_UNIT_FAILED: {
      return prepareListFailed(state.measurementUnit.list.data, emptyEditData);
    }

    case MeasurementUnitAction.NEW_MEASUREMENT_UNIT: {
      return prepareSuccess(state.measurementUnit.list.data, emptyEditData);
    }

    default:
      return state.measurementUnit;
  }
};

/* Selectors */
export const getMeasurementUnitEditData = state => state.constants.measurementUnit.edit.data;
export const getMeasurementUnitListData = state => state.constants.measurementUnit.list.data;
export const getMeasurementUnitIsLoading = state => state.constants.measurementUnit.list.isLoading || state.constants.measurementUnit.edit.isLoading;
export const getMeasurementUnitIsRequestError = state => state.constants.measurementUnit.list.isRequestError || state.constants.measurementUnit.edit.isRequestError;
export const getMeasurementUnitIsSaved = state => state.constants.measurementUnit.isSaved;
export const getMeasurementUnitIsDeleted = state => state.constants.measurementUnit.isDeleted;
