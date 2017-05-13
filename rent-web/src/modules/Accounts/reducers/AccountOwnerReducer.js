import * as AccountOwnerAction from './../actions/AccountOwnerAction';
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

export const accountOwnerReducer = (state, action) => {
  switch (action.type) {
    case AccountOwnerAction.GET_ACCOUNT_OWNER: {
      return prepareEditLoading(state.accountOwner.list.data, emptyEditData);
    }
    case AccountOwnerAction.SAVE_ACCOUNT_OWNER: {
      return prepareEditLoading(state.accountOwner.list.data, state.accountOwner.edit.data);
    }
    case AccountOwnerAction.GET_ACCOUNT_OWNERS:
    case AccountOwnerAction.DELETE_ACCOUNT_OWNER: {
      return prepareListLoading(state.accountOwner.list.data, emptyEditData);
    }

    case AccountOwnerAction.GET_ACCOUNT_OWNER_SUCCESS: {
      return prepareSuccess(state.accountOwner.list.data, action.data);
    }
    case AccountOwnerAction.GET_ACCOUNT_OWNERS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AccountOwnerAction.GET_ACCOUNT_OWNER_FAILED: {
      return prepareEditFailed(state.accountOwner.list.data, emptyEditData);
    }
    case AccountOwnerAction.GET_ACCOUNT_OWNERS_FAILED: {
      return prepareListFailed(state.accountOwner.list.data, emptyEditData);
    }

    case AccountOwnerAction.SAVE_ACCOUNT_OWNER_SUCCESS: {
      return prepareSaveSuccess(state.accountOwner.list.data, emptyEditData);
    }
    case AccountOwnerAction.DELETE_ACCOUNT_OWNER_SUCCESS: {
      return prepareDeleteSuccess(state.accountOwner.list.data, emptyEditData);
    }

    case AccountOwnerAction.SAVE_ACCOUNT_OWNER_FAILED: {
      return prepareEditFailed(state.accountOwner.list.data, state.accountOwner.edit.data);
    }
    case AccountOwnerAction.DELETE_ACCOUNT_OWNER_FAILED: {
      return prepareListFailed(state.accountOwner.list.data, emptyEditData);
    }

    case AccountOwnerAction.NEW_ACCOUNT_OWNER: {
      return prepareSuccess(state.accountOwner.list.data, emptyEditData);
    }

    default:
      return state.accountOwner;
  }
};

/* Selectors */
export const getAccountOwnerEditData = state => state.accounts.accountOwner.edit.data;
export const getAccountOwnerListData = state => state.accounts.accountOwner.list.data;
export const getAccountOwnerIsLoading = state => state.accounts.accountOwner.list.isLoading || state.accounts.accountOwner.edit.isLoading;
export const getAccountOwnerIsRequestError = state => state.accounts.accountOwner.list.isRequestError || state.accounts.accountOwner.edit.isRequestError;
export const getAccountOwnerIsSaved = state => state.accounts.accountOwner.isSaved;
export const getAccountOwnerIsDeleted = state => state.accounts.accountOwner.isDeleted;
