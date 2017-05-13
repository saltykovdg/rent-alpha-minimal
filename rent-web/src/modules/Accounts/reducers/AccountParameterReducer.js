import * as AccountParameterAction from './../actions/AccountParameterAction';
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

export const accountParameterReducer = (state, action) => {
  switch (action.type) {
    case AccountParameterAction.GET_ACCOUNT_PARAMETER: {
      return prepareEditLoading(state.accountParameter.list.data, emptyEditData);
    }
    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER: {
      return prepareEditLoading(state.accountParameter.list.data, state.accountParameter.edit.data);
    }
    case AccountParameterAction.FIND_ACCOUNT_PARAMETERS_BY_NAME:
    case AccountParameterAction.GET_ACCOUNT_PARAMETERS:
    case AccountParameterAction.DELETE_ACCOUNT_PARAMETER: {
      return prepareListLoading(state.accountParameter.list.data, emptyEditData);
    }

    case AccountParameterAction.GET_ACCOUNT_PARAMETER_SUCCESS: {
      return prepareSuccess(state.accountParameter.list.data, action.data);
    }
    case AccountParameterAction.GET_ACCOUNT_PARAMETERS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AccountParameterAction.GET_ACCOUNT_PARAMETER_FAILED: {
      return prepareEditFailed(state.accountParameter.list.data, emptyEditData);
    }
    case AccountParameterAction.GET_ACCOUNT_PARAMETERS_FAILED: {
      return prepareListFailed(state.accountParameter.list.data, emptyEditData);
    }

    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER_SUCCESS: {
      return prepareSaveSuccess(state.accountParameter.list.data, emptyEditData);
    }
    case AccountParameterAction.DELETE_ACCOUNT_PARAMETER_SUCCESS: {
      return prepareDeleteSuccess(state.accountParameter.list.data, emptyEditData);
    }

    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER_FAILED: {
      return prepareEditFailed(state.accountParameter.list.data, state.accountParameter.edit.data);
    }
    case AccountParameterAction.DELETE_ACCOUNT_PARAMETER_FAILED: {
      return prepareListFailed(state.accountParameter.list.data, emptyEditData);
    }

    case AccountParameterAction.NEW_ACCOUNT_PARAMETER: {
      return prepareSuccess(state.accountParameter.list.data, emptyEditData);
    }

    default:
      return state.accountParameter;
  }
};

/* Selectors */
export const getAccountParameterEditData = state => state.accounts.accountParameter.edit.data;
export const getAccountParameterListData = state => state.accounts.accountParameter.list.data;
export const getAccountParameterIsLoading = state => state.accounts.accountParameter.list.isLoading || state.accounts.accountParameter.edit.isLoading;
export const getAccountParameterIsRequestError = state => state.accounts.accountParameter.list.isRequestError || state.accounts.accountParameter.edit.isRequestError;
export const getAccountParameterIsSaved = state => state.accounts.accountParameter.isSaved;
export const getAccountParameterIsDeleted = state => state.accounts.accountParameter.isDeleted;
