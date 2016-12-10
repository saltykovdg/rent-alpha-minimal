import * as ParameterTypeAction from './../actions/ParameterTypeAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
  nameOrigin: '',
};

export const parameterTypeReducer = (state, action) => {
  switch (action.type) {
    case ParameterTypeAction.GET_PARAMETER_TYPE:
    case ParameterTypeAction.SAVE_PARAMETER_TYPE: {
      return prepareEdit(state.parameterType.edit.data, true, false, false, false);
    }
    case ParameterTypeAction.FIND_PARAMETER_TYPES_BY_NAME:
    case ParameterTypeAction.GET_PARAMETER_TYPES:
    case ParameterTypeAction.DELETE_PARAMETER_TYPE: {
      return prepareList(state.parameterType.list.data, emptyEditData, true, false, false, false);
    }

    case ParameterTypeAction.GET_PARAMETER_TYPE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case ParameterTypeAction.GET_PARAMETER_TYPES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case ParameterTypeAction.GET_PARAMETER_TYPE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case ParameterTypeAction.GET_PARAMETER_TYPES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case ParameterTypeAction.SAVE_PARAMETER_TYPE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case ParameterTypeAction.DELETE_PARAMETER_TYPE_SUCCESS: {
      return prepareList(state.parameterType.list.data, emptyEditData, false, false, false, true);
    }

    case ParameterTypeAction.SAVE_PARAMETER_TYPE_FAILED: {
      return prepareEdit(state.parameterType.edit.data, false, true, false, false);
    }
    case ParameterTypeAction.DELETE_PARAMETER_TYPE_FAILED: {
      return prepareList(state.parameterType.list.data, emptyEditData, false, true, false, false);
    }

    case ParameterTypeAction.NEW_PARAMETER_TYPE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.parameterType.list, emptyEditData);
  }
};

/* Selectors */
export const getParameterTypeEditData = state => state.constants.parameterType.edit.data;
export const getParameterTypeListData = state => state.constants.parameterType.list.data;
export const getParameterTypeIsLoading = state => state.constants.parameterType.list.isLoading || state.constants.parameterType.edit.isLoading;
export const getParameterTypeIsRequestError = state => state.constants.parameterType.list.isRequestError || state.constants.parameterType.edit.isRequestError;
export const getParameterTypeIsSaved = state => state.constants.parameterType.isSaved;
export const getParameterTypeIsDeleted = state => state.constants.parameterType.isDeleted;
