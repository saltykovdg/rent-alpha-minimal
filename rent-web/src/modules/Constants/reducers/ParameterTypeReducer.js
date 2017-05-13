import * as ParameterTypeAction from './../actions/ParameterTypeAction';
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

export const parameterTypeReducer = (state, action) => {
  switch (action.type) {
    case ParameterTypeAction.GET_PARAMETER_TYPE: {
      return prepareEditLoading(state.parameterType.list.data, emptyEditData);
    }
    case ParameterTypeAction.SAVE_PARAMETER_TYPE: {
      return prepareEditLoading(state.parameterType.list.data, state.parameterType.edit.data);
    }
    case ParameterTypeAction.FIND_PARAMETER_TYPES_BY_NAME:
    case ParameterTypeAction.GET_PARAMETER_TYPES:
    case ParameterTypeAction.DELETE_PARAMETER_TYPE: {
      return prepareListLoading(state.parameterType.list.data, emptyEditData);
    }

    case ParameterTypeAction.GET_PARAMETER_TYPE_SUCCESS: {
      return prepareSuccess(state.parameterType.list.data, action.data);
    }
    case ParameterTypeAction.GET_PARAMETER_TYPES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case ParameterTypeAction.GET_PARAMETER_TYPE_FAILED: {
      return prepareEditFailed(state.parameterType.list.data, emptyEditData);
    }
    case ParameterTypeAction.GET_PARAMETER_TYPES_FAILED: {
      return prepareListFailed(state.parameterType.list.data, emptyEditData);
    }

    case ParameterTypeAction.SAVE_PARAMETER_TYPE_SUCCESS: {
      return prepareSaveSuccess(state.parameterType.list.data, emptyEditData);
    }
    case ParameterTypeAction.DELETE_PARAMETER_TYPE_SUCCESS: {
      return prepareDeleteSuccess(state.parameterType.list.data, emptyEditData);
    }

    case ParameterTypeAction.SAVE_PARAMETER_TYPE_FAILED: {
      return prepareEditFailed(state.parameterType.list.data, state.parameterType.edit.data);
    }
    case ParameterTypeAction.DELETE_PARAMETER_TYPE_FAILED: {
      return prepareListFailed(state.parameterType.list.data, emptyEditData);
    }

    case ParameterTypeAction.NEW_PARAMETER_TYPE: {
      return prepareSuccess(state.parameterType.list.data, emptyEditData);
    }

    default:
      return state.parameterType;
  }
};

/* Selectors */
export const getParameterTypeEditData = state => state.constants.parameterType.edit.data;
export const getParameterTypeListData = state => state.constants.parameterType.list.data;
export const getParameterTypeIsLoading = state => state.constants.parameterType.list.isLoading || state.constants.parameterType.edit.isLoading;
export const getParameterTypeIsRequestError = state => state.constants.parameterType.list.isRequestError || state.constants.parameterType.edit.isRequestError;
export const getParameterTypeIsSaved = state => state.constants.parameterType.isSaved;
export const getParameterTypeIsDeleted = state => state.constants.parameterType.isDeleted;
