import * as AccountServiceAction from './../actions/AccountServiceAction';
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

export const accountServiceReducer = (state, action) => {
  switch (action.type) {
    case AccountServiceAction.GET_ACCOUNT_SERVICE: {
      return prepareEditLoading(state.accountService.list.data, emptyEditData);
    }
    case AccountServiceAction.SAVE_ACCOUNT_SERVICE: {
      return prepareEditLoading(state.accountService.list.data, state.accountService.edit.data);
    }
    case AccountServiceAction.GET_ACCOUNT_SERVICES:
    case AccountServiceAction.DELETE_ACCOUNT_SERVICE: {
      return prepareListLoading(state.accountService.list.data, emptyEditData);
    }

    case AccountServiceAction.GET_ACCOUNT_SERVICE_SUCCESS: {
      return prepareSuccess(state.accountService.list.data, action.data);
    }
    case AccountServiceAction.GET_ACCOUNT_SERVICES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AccountServiceAction.GET_ACCOUNT_SERVICE_FAILED: {
      return prepareEditFailed(state.accountService.list.data, emptyEditData);
    }
    case AccountServiceAction.GET_ACCOUNT_SERVICES_FAILED: {
      return prepareListFailed(state.accountService.list.data, emptyEditData);
    }

    case AccountServiceAction.SAVE_ACCOUNT_SERVICE_SUCCESS: {
      return prepareSaveSuccess(state.accountService.list.data, emptyEditData);
    }
    case AccountServiceAction.DELETE_ACCOUNT_SERVICE_SUCCESS: {
      return prepareDeleteSuccess(state.accountService.list.data, emptyEditData);
    }

    case AccountServiceAction.SAVE_ACCOUNT_SERVICE_FAILED: {
      return prepareEditFailed(state.accountService.list.data, state.accountService.edit.data);
    }
    case AccountServiceAction.DELETE_ACCOUNT_SERVICE_FAILED: {
      return prepareListFailed(state.accountService.list.data, emptyEditData);
    }

    case AccountServiceAction.NEW_ACCOUNT_SERVICE: {
      return prepareSuccess(state.accountService.list.data, emptyEditData);
    }

    default:
      return state.accountService;
  }
};

/* Selectors */
export const getAccountServiceEditData = state => state.accounts.accountService.edit.data;
export const getAccountServiceListData = state => state.accounts.accountService.list.data;
export const getAccountServiceIsLoading = state => state.accounts.accountService.list.isLoading || state.accounts.accountService.edit.isLoading;
export const getAccountServiceIsRequestError = state => state.accounts.accountService.list.isRequestError || state.accounts.accountService.edit.isRequestError;
export const getAccountServiceIsSaved = state => state.accounts.accountService.isSaved;
export const getAccountServiceIsDeleted = state => state.accounts.accountService.isDeleted;
