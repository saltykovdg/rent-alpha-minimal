import * as NormValueAction from './../actions/NormValueAction';
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

export const normValueReducer = (state, action) => {
  switch (action.type) {
    case NormValueAction.GET_NORM_VALUE: {
      return prepareEditLoading(state.normValue.list.data, emptyEditData);
    }
    case NormValueAction.SAVE_NORM_VALUE: {
      return prepareEditLoading(state.normValue.list.data, state.normValue.edit.data);
    }
    case NormValueAction.GET_NORM_VALUES:
    case NormValueAction.DELETE_NORM_VALUE: {
      return prepareListLoading(state.normValue.list.data, emptyEditData);
    }

    case NormValueAction.GET_NORM_VALUE_SUCCESS: {
      return prepareSuccess(state.normValue.list.data, action.data);
    }
    case NormValueAction.GET_NORM_VALUES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case NormValueAction.GET_NORM_VALUE_FAILED: {
      return prepareEditFailed(state.normValue.list.data, emptyEditData);
    }
    case NormValueAction.GET_NORM_VALUES_FAILED: {
      return prepareListFailed(state.normValue.list.data, emptyEditData);
    }

    case NormValueAction.SAVE_NORM_VALUE_SUCCESS: {
      return prepareSaveSuccess(state.normValue.list.data, emptyEditData);
    }
    case NormValueAction.DELETE_NORM_VALUE_SUCCESS: {
      return prepareDeleteSuccess(state.normValue.list.data, emptyEditData);
    }

    case NormValueAction.SAVE_NORM_VALUE_FAILED: {
      return prepareEditFailed(state.normValue.list.data, state.normValue.edit.data);
    }
    case NormValueAction.DELETE_NORM_VALUE_FAILED: {
      return prepareListFailed(state.normValue.list.data, emptyEditData);
    }

    case NormValueAction.NEW_NORM_VALUE: {
      return prepareSuccess(state.normValue.list.data, emptyEditData);
    }

    default:
      return state.normValue;
  }
};

/* Selectors */
export const getNormValueEditData = state => state.norms.normValue.edit.data;
export const getNormValueListData = state => state.norms.normValue.list.data;
export const getNormValueIsLoading = state => state.norms.normValue.list.isLoading || state.norms.normValue.edit.isLoading;
export const getNormValueIsRequestError = state => state.norms.normValue.list.isRequestError || state.norms.normValue.edit.isRequestError;
export const getNormValueIsSaved = state => state.norms.normValue.isSaved;
export const getNormValueIsDeleted = state => state.norms.normValue.isDeleted;
