import * as AccountPaymentAction from './../actions/AccountPaymentAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

export const accountPaymentReducer = (state, action) => {
  switch (action.type) {
    case AccountPaymentAction.ADD_ACCOUNT_PAYMENT: {
      return prepareEditLoading(state.accountPayment.list.data, state.accountPayment.edit.data);
    }
    case AccountPaymentAction.GET_ACCOUNT_PAYMENTS:
    case AccountPaymentAction.DELETE_ACCOUNT_PAYMENT: {
      return prepareListLoading(state.accountPayment.list.data, state.accountPayment.edit.data);
    }

    case AccountPaymentAction.GET_ACCOUNT_PAYMENTS_SUCCESS: {
      return prepareSuccess(action.data, state.accountPayment.edit.data);
    }

    case AccountPaymentAction.GET_ACCOUNT_PAYMENTS_FAILED: {
      return prepareListFailed(state.accountPayment.list.data, state.accountPayment.edit.data);
    }

    case AccountPaymentAction.ADD_ACCOUNT_PAYMENT_SUCCESS: {
      return prepareSaveSuccess(state.accountPayment.list.data, state.accountPayment.edit.data);
    }
    case AccountPaymentAction.DELETE_ACCOUNT_PAYMENT_SUCCESS: {
      return prepareDeleteSuccess(state.accountPayment.list.data, state.accountPayment.edit.data);
    }

    case AccountPaymentAction.ADD_ACCOUNT_PAYMENT_FAILED: {
      return prepareEditFailed(state.accountPayment.list.data, state.accountPayment.edit.data);
    }
    case AccountPaymentAction.DELETE_ACCOUNT_PAYMENT_FAILED: {
      return prepareListFailed(state.accountPayment.list.data, state.accountPayment.edit.data);
    }

    default:
      return state.accountPayment;
  }
};

/* Selectors */
export const getAccountPaymentListData = state => state.accounts.accountPayment.list.data;
export const getAccountPaymentIsLoadingEdit = state => state.accounts.accountPayment.edit.isLoading;
export const getAccountPaymentIsLoadingList = state => state.accounts.accountPayment.list.isLoading;
export const getAccountPaymentIsRequestError = state => state.accounts.accountPayment.list.isRequestError || state.accounts.accountPayment.edit.isRequestError;
export const getAccountPaymentIsSaved = state => state.accounts.accountPayment.isSaved;
export const getAccountPaymentIsDeleted = state => state.accounts.accountPayment.isDeleted;
