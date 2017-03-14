import * as AccountRegisteredAction from './../actions/AccountRegisteredAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const accountRegisteredReducer = (state, action) => {
  switch (action.type) {
    case AccountRegisteredAction.GET_ACCOUNT_REGISTERED:
    case AccountRegisteredAction.SAVE_ACCOUNT_REGISTERED: {
      return prepareEdit(state.accountRegistered.edit.data, true, false, false, false);
    }
    case AccountRegisteredAction.GET_ACCOUNT_REGISTEREDS:
    case AccountRegisteredAction.DELETE_ACCOUNT_REGISTERED: {
      return prepareList(state.accountRegistered.list.data, emptyEditData, true, false, false, false);
    }

    case AccountRegisteredAction.GET_ACCOUNT_REGISTERED_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AccountRegisteredAction.GET_ACCOUNT_REGISTEREDS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AccountRegisteredAction.GET_ACCOUNT_REGISTERED_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AccountRegisteredAction.GET_ACCOUNT_REGISTEREDS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AccountRegisteredAction.SAVE_ACCOUNT_REGISTERED_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AccountRegisteredAction.DELETE_ACCOUNT_REGISTERED_SUCCESS: {
      return prepareList(state.accountRegistered.list.data, emptyEditData, false, false, false, true);
    }

    case AccountRegisteredAction.SAVE_ACCOUNT_REGISTERED_FAILED: {
      return prepareEdit(state.accountRegistered.edit.data, false, true, false, false);
    }
    case AccountRegisteredAction.DELETE_ACCOUNT_REGISTERED_FAILED: {
      return prepareList(state.accountRegistered.list.data, emptyEditData, false, true, false, false);
    }

    case AccountRegisteredAction.NEW_ACCOUNT_REGISTERED: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.accountRegistered.list, emptyEditData);
  }
};

/* Selectors */
export const getAccountRegisteredEditData = state => state.accounts.accountRegistered.edit.data;
export const getAccountRegisteredListData = state => state.accounts.accountRegistered.list.data;
export const getAccountRegisteredIsLoading = state => state.accounts.accountRegistered.list.isLoading || state.accounts.accountRegistered.edit.isLoading;
export const getAccountRegisteredIsRequestError = state => state.accounts.accountRegistered.list.isRequestError || state.accounts.accountRegistered.edit.isRequestError;
export const getAccountRegisteredIsSaved = state => state.accounts.accountRegistered.isSaved;
export const getAccountRegisteredIsDeleted = state => state.accounts.accountRegistered.isDeleted;
