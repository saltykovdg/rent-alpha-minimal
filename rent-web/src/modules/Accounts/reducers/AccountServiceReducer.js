import * as AccountServiceAction from './../actions/AccountServiceAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const accountServiceReducer = (state, action) => {
  switch (action.type) {
    case AccountServiceAction.GET_ACCOUNT_SERVICE:
    case AccountServiceAction.SAVE_ACCOUNT_SERVICE: {
      return prepareEdit(state.accountService.edit.data, true, false, false, false);
    }
    case AccountServiceAction.GET_ACCOUNT_SERVICES:
    case AccountServiceAction.DELETE_ACCOUNT_SERVICE: {
      return prepareList(state.accountService.list.data, emptyEditData, true, false, false, false);
    }

    case AccountServiceAction.GET_ACCOUNT_SERVICE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AccountServiceAction.GET_ACCOUNT_SERVICES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AccountServiceAction.GET_ACCOUNT_SERVICE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AccountServiceAction.GET_ACCOUNT_SERVICES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AccountServiceAction.SAVE_ACCOUNT_SERVICE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AccountServiceAction.DELETE_ACCOUNT_SERVICE_SUCCESS: {
      return prepareList(state.accountService.list.data, emptyEditData, false, false, false, true);
    }

    case AccountServiceAction.SAVE_ACCOUNT_SERVICE_FAILED: {
      return prepareEdit(state.accountService.edit.data, false, true, false, false);
    }
    case AccountServiceAction.DELETE_ACCOUNT_SERVICE_FAILED: {
      return prepareList(state.accountService.list.data, emptyEditData, false, true, false, false);
    }

    case AccountServiceAction.NEW_ACCOUNT_SERVICE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.accountService.list, emptyEditData);
  }
};

/* Selectors */
export const getAccountServiceEditData = state => state.accounts.accountService.edit.data;
export const getAccountServiceListData = state => state.accounts.accountService.list.data;
export const getAccountServiceIsLoading = state => state.accounts.accountService.list.isLoading || state.accounts.accountService.edit.isLoading;
export const getAccountServiceIsRequestError = state => state.accounts.accountService.list.isRequestError || state.accounts.accountService.edit.isRequestError;
export const getAccountServiceIsSaved = state => state.accounts.accountService.isSaved;
export const getAccountServiceIsDeleted = state => state.accounts.accountService.isDeleted;
