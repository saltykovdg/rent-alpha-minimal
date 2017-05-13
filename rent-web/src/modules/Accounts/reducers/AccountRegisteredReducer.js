import * as AccountRegisteredAction from './../actions/AccountRegisteredAction';
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

export const accountRegisteredReducer = (state, action) => {
  switch (action.type) {
    case AccountRegisteredAction.GET_ACCOUNT_REGISTERED: {
      return prepareEditLoading(state.accountRegistered.list.data, emptyEditData);
    }
    case AccountRegisteredAction.SAVE_ACCOUNT_REGISTERED: {
      return prepareEditLoading(state.accountRegistered.list.data, state.accountRegistered.edit.data);
    }
    case AccountRegisteredAction.GET_ACCOUNT_REGISTEREDS:
    case AccountRegisteredAction.DELETE_ACCOUNT_REGISTERED: {
      return prepareListLoading(state.accountRegistered.list.data, emptyEditData);
    }

    case AccountRegisteredAction.GET_ACCOUNT_REGISTERED_SUCCESS: {
      return prepareSuccess(state.accountRegistered.list.data, action.data);
    }
    case AccountRegisteredAction.GET_ACCOUNT_REGISTEREDS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AccountRegisteredAction.GET_ACCOUNT_REGISTERED_FAILED: {
      return prepareEditFailed(state.accountRegistered.list.data, emptyEditData);
    }
    case AccountRegisteredAction.GET_ACCOUNT_REGISTEREDS_FAILED: {
      return prepareListFailed(state.accountRegistered.list.data, emptyEditData);
    }

    case AccountRegisteredAction.SAVE_ACCOUNT_REGISTERED_SUCCESS: {
      return prepareSaveSuccess(state.accountRegistered.list.data, emptyEditData);
    }
    case AccountRegisteredAction.DELETE_ACCOUNT_REGISTERED_SUCCESS: {
      return prepareDeleteSuccess(state.accountRegistered.list.data, emptyEditData);
    }

    case AccountRegisteredAction.SAVE_ACCOUNT_REGISTERED_FAILED: {
      return prepareEditFailed(state.accountRegistered.list.data, state.accountRegistered.edit.data);
    }
    case AccountRegisteredAction.DELETE_ACCOUNT_REGISTERED_FAILED: {
      return prepareListFailed(state.accountRegistered.list.data, emptyEditData);
    }

    case AccountRegisteredAction.NEW_ACCOUNT_REGISTERED: {
      return prepareSuccess(state.accountRegistered.list.data, emptyEditData);
    }

    default:
      return state.accountRegistered;
  }
};

/* Selectors */
export const getAccountRegisteredEditData = state => state.accounts.accountRegistered.edit.data;
export const getAccountRegisteredListData = state => state.accounts.accountRegistered.list.data;
export const getAccountRegisteredIsLoading = state => state.accounts.accountRegistered.list.isLoading || state.accounts.accountRegistered.edit.isLoading;
export const getAccountRegisteredIsRequestError = state => state.accounts.accountRegistered.list.isRequestError || state.accounts.accountRegistered.edit.isRequestError;
export const getAccountRegisteredIsSaved = state => state.accounts.accountRegistered.isSaved;
export const getAccountRegisteredIsDeleted = state => state.accounts.accountRegistered.isDeleted;
