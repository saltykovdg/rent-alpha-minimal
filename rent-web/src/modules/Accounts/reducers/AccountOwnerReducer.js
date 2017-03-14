import * as AccountOwnerAction from './../actions/AccountOwnerAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const accountOwnerReducer = (state, action) => {
  switch (action.type) {
    case AccountOwnerAction.GET_ACCOUNT_OWNER:
    case AccountOwnerAction.SAVE_ACCOUNT_OWNER: {
      return prepareEdit(state.accountOwner.edit.data, true, false, false, false);
    }
    case AccountOwnerAction.GET_ACCOUNT_OWNERS:
    case AccountOwnerAction.DELETE_ACCOUNT_OWNER: {
      return prepareList(state.accountOwner.list.data, emptyEditData, true, false, false, false);
    }

    case AccountOwnerAction.GET_ACCOUNT_OWNER_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AccountOwnerAction.GET_ACCOUNT_OWNERS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AccountOwnerAction.GET_ACCOUNT_OWNER_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AccountOwnerAction.GET_ACCOUNT_OWNERS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AccountOwnerAction.SAVE_ACCOUNT_OWNER_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AccountOwnerAction.DELETE_ACCOUNT_OWNER_SUCCESS: {
      return prepareList(state.accountOwner.list.data, emptyEditData, false, false, false, true);
    }

    case AccountOwnerAction.SAVE_ACCOUNT_OWNER_FAILED: {
      return prepareEdit(state.accountOwner.edit.data, false, true, false, false);
    }
    case AccountOwnerAction.DELETE_ACCOUNT_OWNER_FAILED: {
      return prepareList(state.accountOwner.list.data, emptyEditData, false, true, false, false);
    }

    case AccountOwnerAction.NEW_ACCOUNT_OWNER: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.accountOwner.list, emptyEditData);
  }
};

/* Selectors */
export const getAccountOwnerEditData = state => state.accounts.accountOwner.edit.data;
export const getAccountOwnerListData = state => state.accounts.accountOwner.list.data;
export const getAccountOwnerIsLoading = state => state.accounts.accountOwner.list.isLoading || state.accounts.accountOwner.edit.isLoading;
export const getAccountOwnerIsRequestError = state => state.accounts.accountOwner.list.isRequestError || state.accounts.accountOwner.edit.isRequestError;
export const getAccountOwnerIsSaved = state => state.accounts.accountOwner.isSaved;
export const getAccountOwnerIsDeleted = state => state.accounts.accountOwner.isDeleted;
