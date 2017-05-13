import * as CalculationTypeAction from './../actions/CalculationTypeAction';
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
  nameOrigin: '',
};

export const calculationTypeReducer = (state, action) => {
  switch (action.type) {
    case CalculationTypeAction.GET_CALCULATION_TYPE: {
      return prepareEditLoading(state.calculationType.list.data, emptyEditData);
    }
    case CalculationTypeAction.SAVE_CALCULATION_TYPE: {
      return prepareEditLoading(state.calculationType.list.data, state.calculationType.edit.data);
    }
    case CalculationTypeAction.FIND_CALCULATION_TYPES_BY_NAME:
    case CalculationTypeAction.GET_CALCULATION_TYPES:
    case CalculationTypeAction.DELETE_CALCULATION_TYPE: {
      return prepareListLoading(state.calculationType.list.data, emptyEditData);
    }

    case CalculationTypeAction.GET_CALCULATION_TYPE_SUCCESS: {
      return prepareSuccess(state.calculationType.list.data, action.data);
    }
    case CalculationTypeAction.GET_CALCULATION_TYPES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case CalculationTypeAction.GET_CALCULATION_TYPE_FAILED: {
      return prepareEditFailed(state.calculationType.list.data, emptyEditData);
    }
    case CalculationTypeAction.GET_CALCULATION_TYPES_FAILED: {
      return prepareListFailed(state.calculationType.list.data, emptyEditData);
    }

    case CalculationTypeAction.SAVE_CALCULATION_TYPE_SUCCESS: {
      return prepareSaveSuccess(state.calculationType.list.data, emptyEditData);
    }
    case CalculationTypeAction.DELETE_CALCULATION_TYPE_SUCCESS: {
      return prepareDeleteSuccess(state.calculationType.list.data, emptyEditData);
    }

    case CalculationTypeAction.SAVE_CALCULATION_TYPE_FAILED: {
      return prepareEditFailed(state.calculationType.list.data, state.calculationType.edit.data);
    }
    case CalculationTypeAction.DELETE_CALCULATION_TYPE_FAILED: {
      return prepareListFailed(state.calculationType.list.data, emptyEditData);
    }

    case CalculationTypeAction.NEW_CALCULATION_TYPE: {
      return prepareSuccess(state.calculationType.list.data, emptyEditData);
    }

    default:
      return state.calculationType;
  }
};

/* Selectors */
export const getCalculationTypeEditData = state => state.constants.calculationType.edit.data;
export const getCalculationTypeListData = state => state.constants.calculationType.list.data;
export const getCalculationTypeIsLoading = state => state.constants.calculationType.list.isLoading || state.constants.calculationType.edit.isLoading;
export const getCalculationTypeIsRequestError = state => state.constants.calculationType.list.isRequestError || state.constants.calculationType.edit.isRequestError;
export const getCalculationTypeIsSaved = state => state.constants.calculationType.isSaved;
export const getCalculationTypeIsDeleted = state => state.constants.calculationType.isDeleted;
