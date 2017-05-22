import * as AccountRecalculationAction from './../actions/AccountRecalculationAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

export const accountRecalculationReducer = (state, action) => {
  switch (action.type) {
    case AccountRecalculationAction.ADD_ACCOUNT_RECALCULATION: {
      return prepareEditLoading(state.accountRecalculation.list.data, state.accountRecalculation.edit.data);
    }
    case AccountRecalculationAction.GET_ACCOUNT_RECALCULATIONS:
    case AccountRecalculationAction.DELETE_ACCOUNT_RECALCULATION: {
      return prepareListLoading(state.accountRecalculation.list.data, state.accountRecalculation.edit.data);
    }

    case AccountRecalculationAction.GET_ACCOUNT_RECALCULATIONS_SUCCESS: {
      return prepareSuccess(action.data, state.accountRecalculation.edit.data);
    }

    case AccountRecalculationAction.GET_ACCOUNT_RECALCULATIONS_FAILED: {
      return prepareListFailed(state.accountRecalculation.list.data, state.accountRecalculation.edit.data);
    }

    case AccountRecalculationAction.ADD_ACCOUNT_RECALCULATION_SUCCESS: {
      return prepareSaveSuccess(state.accountRecalculation.list.data, state.accountRecalculation.edit.data);
    }
    case AccountRecalculationAction.DELETE_ACCOUNT_RECALCULATION_SUCCESS: {
      return prepareDeleteSuccess(state.accountRecalculation.list.data, state.accountRecalculation.edit.data);
    }

    case AccountRecalculationAction.ADD_ACCOUNT_RECALCULATION_FAILED: {
      return prepareEditFailed(state.accountRecalculation.list.data, state.accountRecalculation.edit.data);
    }
    case AccountRecalculationAction.DELETE_ACCOUNT_RECALCULATION_FAILED: {
      return prepareListFailed(state.accountRecalculation.list.data, state.accountRecalculation.edit.data);
    }

    default:
      return state.accountRecalculation;
  }
};

/* Selectors */
export const getAccountRecalculationListData = state => state.accounts.accountRecalculation.list.data;
export const getAccountRecalculationIsLoadingEdit = state => state.accounts.accountRecalculation.edit.isLoading;
export const getAccountRecalculationIsLoadingList = state => state.accounts.accountRecalculation.list.isLoading;
export const getAccountRecalculationIsRequestError = state => state.accounts.accountRecalculation.list.isRequestError || state.accounts.accountRecalculation.edit.isRequestError;
export const getAccountRecalculationIsSaved = state => state.accounts.accountRecalculation.isSaved;
export const getAccountRecalculationIsDeleted = state => state.accounts.accountRecalculation.isDeleted;
