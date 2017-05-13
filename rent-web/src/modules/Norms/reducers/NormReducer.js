import * as NormAction from './../actions/NormAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

export const emptyNormValue = {
  id: '',
  measurementUnit: {
    id: '',
    name: '',
  },
  value: 0,
  dateStart: null,
  dateEnd: null,
};

const emptyEditData = {
  id: '',
  name: '',
  values: [],
};

export const normReducer = (state, action) => {
  switch (action.type) {
    case NormAction.GET_NORM: {
      return prepareEditLoading(state.norm.list.data, emptyEditData);
    }
    case NormAction.SAVE_NORM: {
      return prepareEditLoading(state.norm.list.data, state.norm.edit.data);
    }
    case NormAction.FIND_NORMS_BY_SERVICE_ID:
    case NormAction.GET_NORMS:
    case NormAction.DELETE_NORM: {
      return prepareListLoading(state.norm.list.data, emptyEditData);
    }

    case NormAction.GET_NORM_SUCCESS: {
      return prepareSuccess(state.norm.list.data, action.data);
    }
    case NormAction.GET_NORMS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case NormAction.GET_NORM_FAILED: {
      return prepareEditFailed(state.norm.list.data, emptyEditData);
    }
    case NormAction.GET_NORMS_FAILED: {
      return prepareListFailed(state.norm.list.data, emptyEditData);
    }

    case NormAction.SAVE_NORM_SUCCESS: {
      return prepareSaveSuccess(state.norm.list.data, emptyEditData);
    }
    case NormAction.DELETE_NORM_SUCCESS: {
      return prepareDeleteSuccess(state.norm.list.data, emptyEditData);
    }

    case NormAction.SAVE_NORM_FAILED: {
      return prepareEditFailed(state.norm.list.data, state.norm.edit.data, action.showError);
    }
    case NormAction.DELETE_NORM_FAILED: {
      return prepareListFailed(state.norm.list.data, emptyEditData);
    }

    case NormAction.NEW_NORM: {
      return prepareSuccess(state.norm.list.data, emptyEditData);
    }

    case NormAction.ADD_NEW_VALUE_TO_NORM: {
      const newObj = state.norm.edit.data;
      newObj.values.push(action.normValue);
      return prepareSuccess(state.norm.list.data, newObj);
    }

    case NormAction.EDIT_VALUE_IN_NORM: {
      const newObj = state.norm.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.normValue.id);
      newObj.values.push(action.normValue);
      return prepareSuccess(state.norm.list.data, newObj);
    }

    case NormAction.REMOVE_VALUE_FROM_NORM: {
      const newObj = state.norm.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.normValue.id);
      return prepareSuccess(state.norm.list.data, newObj);
    }

    default:
      return state.norm;
  }
};

/* Selectors */
export const getNormEditData = state => state.norms.norm.edit.data;
export const getNormListData = state => state.norms.norm.list.data;
export const getNormIsLoading = state => state.norms.norm.list.isLoading || state.norms.norm.edit.isLoading;
export const getNormIsRequestError = state => state.norms.norm.list.isRequestError || state.norms.norm.edit.isRequestError;
export const getNormIsSaved = state => state.norms.norm.isSaved;
export const getNormIsDeleted = state => state.norms.norm.isDeleted;
