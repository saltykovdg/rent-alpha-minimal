import * as CalculationTypeAction from './../actions/CalculationTypeAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
  nameOrigin: '',
};

export const calculationTypeReducer = (state, action) => {
  switch (action.type) {
    case CalculationTypeAction.GET_CALCULATION_TYPE:
    case CalculationTypeAction.SAVE_CALCULATION_TYPE: {
      return prepareEdit(state.calculationType.edit.data, true, false, false, false);
    }
    case CalculationTypeAction.FIND_CALCULATION_TYPES_BY_NAME:
    case CalculationTypeAction.GET_CALCULATION_TYPES:
    case CalculationTypeAction.DELETE_CALCULATION_TYPE: {
      return prepareList(state.calculationType.list.data, emptyEditData, true, false, false, false);
    }

    case CalculationTypeAction.GET_CALCULATION_TYPE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case CalculationTypeAction.GET_CALCULATION_TYPES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case CalculationTypeAction.GET_CALCULATION_TYPE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case CalculationTypeAction.GET_CALCULATION_TYPES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case CalculationTypeAction.SAVE_CALCULATION_TYPE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case CalculationTypeAction.DELETE_CALCULATION_TYPE_SUCCESS: {
      return prepareList(state.calculationType.list.data, emptyEditData, false, false, false, true);
    }

    case CalculationTypeAction.SAVE_CALCULATION_TYPE_FAILED: {
      return prepareEdit(state.calculationType.edit.data, false, true, false, false);
    }
    case CalculationTypeAction.DELETE_CALCULATION_TYPE_FAILED: {
      return prepareList(state.calculationType.list.data, emptyEditData, false, true, false, false);
    }

    case CalculationTypeAction.NEW_CALCULATION_TYPE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.calculationType.list, emptyEditData);
  }
};

/* Selectors */
export const getCalculationTypeEditData = state => state.constants.calculationType.edit.data;
export const getCalculationTypeListData = state => state.constants.calculationType.list.data;
export const getCalculationTypeIsLoading = state => state.constants.calculationType.list.isLoading || state.constants.calculationType.edit.isLoading;
export const getCalculationTypeIsRequestError = state => state.constants.calculationType.list.isRequestError || state.constants.calculationType.edit.isRequestError;
export const getCalculationTypeIsSaved = state => state.constants.calculationType.isSaved;
export const getCalculationTypeIsDeleted = state => state.constants.calculationType.isDeleted;
