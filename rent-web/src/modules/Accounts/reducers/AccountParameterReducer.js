import * as AccountParameterAction from './../actions/AccountParameterAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const accountParameterReducer = (state, action) => {
  switch (action.type) {
    case AccountParameterAction.GET_ACCOUNT_PARAMETER:
    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER: {
      return prepareEdit(state.accountParameter.edit.data, true, false, false, false);
    }
    case AccountParameterAction.FIND_ACCOUNT_PARAMETERS_BY_NAME:
    case AccountParameterAction.GET_ACCOUNT_PARAMETERS:
    case AccountParameterAction.DELETE_ACCOUNT_PARAMETER: {
      return prepareList(state.accountParameter.list.data, emptyEditData, true, false, false, false);
    }

    case AccountParameterAction.GET_ACCOUNT_PARAMETER_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AccountParameterAction.GET_ACCOUNT_PARAMETERS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AccountParameterAction.GET_ACCOUNT_PARAMETER_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AccountParameterAction.GET_ACCOUNT_PARAMETERS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AccountParameterAction.DELETE_ACCOUNT_PARAMETER_SUCCESS: {
      return prepareList(state.accountParameter.list.data, emptyEditData, false, false, false, true);
    }

    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER_FAILED: {
      return prepareEdit(state.accountParameter.edit.data, false, true, false, false);
    }
    case AccountParameterAction.DELETE_ACCOUNT_PARAMETER_FAILED: {
      return prepareList(state.accountParameter.list.data, emptyEditData, false, true, false, false);
    }

    case AccountParameterAction.NEW_ACCOUNT_PARAMETER: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.accountParameter.list, emptyEditData);
  }
};

/* Selectors */
export const getAccountParameterEditData = state => state.accounts.accountParameter.edit.data;
export const getAccountParameterListData = state => state.accounts.accountParameter.list.data;
export const getAccountParameterIsLoading = state => state.accounts.accountParameter.list.isLoading || state.accounts.accountParameter.edit.isLoading;
export const getAccountParameterIsRequestError = state => state.accounts.accountParameter.list.isRequestError || state.accounts.accountParameter.edit.isRequestError;
export const getAccountParameterIsSaved = state => state.accounts.accountParameter.isSaved;
export const getAccountParameterIsDeleted = state => state.accounts.accountParameter.isDeleted;
