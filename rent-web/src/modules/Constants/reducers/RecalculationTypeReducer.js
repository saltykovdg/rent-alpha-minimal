import * as RecalculationTypeAction from './../actions/RecalculationTypeAction';
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

export const recalculationTypeReducer = (state, action) => {
  switch (action.type) {
    case RecalculationTypeAction.GET_RECALCULATION_TYPE: {
      return prepareEditLoading(state.recalculationType.list.data, emptyEditData);
    }
    case RecalculationTypeAction.SAVE_RECALCULATION_TYPE: {
      return prepareEditLoading(state.recalculationType.list.data, state.recalculationType.edit.data);
    }
    case RecalculationTypeAction.FIND_RECALCULATION_TYPES_BY_NAME:
    case RecalculationTypeAction.GET_RECALCULATION_TYPES:
    case RecalculationTypeAction.DELETE_RECALCULATION_TYPE: {
      return prepareListLoading(state.recalculationType.list.data, emptyEditData);
    }

    case RecalculationTypeAction.GET_RECALCULATION_TYPE_SUCCESS: {
      return prepareSuccess(state.recalculationType.list.data, action.data);
    }
    case RecalculationTypeAction.GET_RECALCULATION_TYPES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case RecalculationTypeAction.GET_RECALCULATION_TYPE_FAILED: {
      return prepareEditFailed(state.recalculationType.list.data, emptyEditData);
    }
    case RecalculationTypeAction.GET_RECALCULATION_TYPES_FAILED: {
      return prepareListFailed(state.recalculationType.list.data, emptyEditData);
    }

    case RecalculationTypeAction.SAVE_RECALCULATION_TYPE_SUCCESS: {
      return prepareSaveSuccess(state.recalculationType.list.data, emptyEditData);
    }
    case RecalculationTypeAction.DELETE_RECALCULATION_TYPE_SUCCESS: {
      return prepareDeleteSuccess(state.recalculationType.list.data, emptyEditData);
    }

    case RecalculationTypeAction.SAVE_RECALCULATION_TYPE_FAILED: {
      return prepareEditFailed(state.recalculationType.list.data, state.recalculationType.edit.data);
    }
    case RecalculationTypeAction.DELETE_RECALCULATION_TYPE_FAILED: {
      return prepareListFailed(state.recalculationType.list.data, emptyEditData);
    }

    case RecalculationTypeAction.NEW_RECALCULATION_TYPE: {
      return prepareSuccess(state.recalculationType.list.data, emptyEditData);
    }

    default:
      return state.recalculationType;
  }
};

/* Selectors */
export const getRecalculationTypeEditData = state => state.constants.recalculationType.edit.data;
export const getRecalculationTypeListData = state => state.constants.recalculationType.list.data;
export const getRecalculationTypeIsLoading = state => state.constants.recalculationType.list.isLoading || state.constants.recalculationType.edit.isLoading;
export const getRecalculationTypeIsRequestError = state => state.constants.recalculationType.list.isRequestError || state.constants.recalculationType.edit.isRequestError;
export const getRecalculationTypeIsSaved = state => state.constants.recalculationType.isSaved;
export const getRecalculationTypeIsDeleted = state => state.constants.recalculationType.isDeleted;
