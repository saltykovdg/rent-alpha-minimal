import * as NormAction from './../actions/NormAction';
import * as NormValueAction from './../actions/NormValueAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

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
    case NormAction.GET_NORM:
    case NormAction.SAVE_NORM: {
      return prepareEdit(state.norm.edit.data, true, false, false, false);
    }
    case NormAction.FIND_NORMS_BY_SERVICE_ID:
    case NormAction.GET_NORMS:
    case NormAction.DELETE_NORM: {
      return prepareList(state.norm.list.data, emptyEditData, true, false, false, false);
    }

    case NormAction.GET_NORM_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case NormAction.GET_NORMS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case NormAction.GET_NORM_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case NormAction.GET_NORMS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case NormAction.SAVE_NORM_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case NormAction.DELETE_NORM_SUCCESS: {
      return prepareList(state.norm.list.data, emptyEditData, false, false, false, true);
    }

    case NormAction.SAVE_NORM_FAILED: {
      return prepareEdit(state.norm.edit.data, false, action.showError, false, false);
    }
    case NormAction.DELETE_NORM_FAILED: {
      return prepareList(state.norm.list.data, emptyEditData, false, true, false, false);
    }

    case NormAction.NEW_NORM: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    case NormAction.ADD_NEW_VALUE_TO_NORM: {
      const newObj = state.norm.edit.data;
      newObj.values.push(action.normValue);
      return prepareEdit(newObj, false, false, false, false);
    }

    case NormAction.EDIT_VALUE_IN_NORM: {
      const newObj = state.norm.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.normValue.id);
      newObj.values.push(action.normValue);
      return prepareEdit(newObj, false, false, false, false);
    }

    case NormAction.REMOVE_VALUE_FROM_NORM: {
      const newObj = state.norm.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.normValue.id);
      return prepareEdit(newObj, false, false, false, false);
    }

    case NormValueAction.SAVE_NORM_VALUE:
    case NormValueAction.SAVE_NORM_VALUE_SUCCESS:
    case NormValueAction.SAVE_NORM_VALUE_FAILED: {
      return state.norm;
    }

    default:
      return prepareDefault(state.norm.list, emptyEditData);
  }
};

/* Selectors */
export const getNormEditData = state => state.norms.norm.edit.data;
export const getNormListData = state => state.norms.norm.list.data;
export const getNormIsLoading = state => state.norms.norm.list.isLoading || state.norms.norm.edit.isLoading;
export const getNormIsRequestError = state => state.norms.norm.list.isRequestError || state.norms.norm.edit.isRequestError;
export const getNormIsSaved = state => state.norms.norm.isSaved;
export const getNormIsDeleted = state => state.norms.norm.isDeleted;
