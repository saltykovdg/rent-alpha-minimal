import * as NormValueAction from './../actions/NormValueAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const normValueReducer = (state, action) => {
  switch (action.type) {
    case NormValueAction.GET_NORM_VALUE:
    case NormValueAction.SAVE_NORM_VALUE: {
      return prepareEdit(state.normValue.edit.data, true, false, false, false);
    }
    case NormValueAction.GET_NORM_VALUES:
    case NormValueAction.DELETE_NORM_VALUE: {
      return prepareList(state.normValue.list.data, emptyEditData, true, false, false, false);
    }

    case NormValueAction.GET_NORM_VALUE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case NormValueAction.GET_NORM_VALUES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case NormValueAction.GET_NORM_VALUE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case NormValueAction.GET_NORM_VALUES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case NormValueAction.SAVE_NORM_VALUE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case NormValueAction.DELETE_NORM_VALUE_SUCCESS: {
      return prepareList(state.normValue.list.data, emptyEditData, false, false, false, true);
    }

    case NormValueAction.SAVE_NORM_VALUE_FAILED: {
      return prepareEdit(state.normValue.edit.data, false, true, false, false);
    }
    case NormValueAction.DELETE_NORM_VALUE_FAILED: {
      return prepareList(state.normValue.list.data, emptyEditData, false, true, false, false);
    }

    case NormValueAction.NEW_NORM_VALUE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.normValue.list, emptyEditData);
  }
};

/* Selectors */
export const getNormValueEditData = state => state.norms.normValue.edit.data;
export const getNormValueListData = state => state.norms.normValue.list.data;
export const getNormValueIsLoading = state => state.norms.normValue.list.isLoading || state.norms.normValue.edit.isLoading;
export const getNormValueIsRequestError = state => state.norms.normValue.list.isRequestError || state.norms.normValue.edit.isRequestError;
export const getNormValueIsSaved = state => state.norms.normValue.isSaved;
export const getNormValueIsDeleted = state => state.norms.normValue.isDeleted;
