import * as AccountAction from './../actions/AccountAction';
import {
  prepare,
  prepareListLoading,
  prepareSuccess,
  prepareListFailed,
} from './../../../util/ReducerUtil';

export const accountCalculationReducer = (state, action) => {
  switch (action.type) {
    case AccountAction.GET_ACCOUNT_CALCULATIONS: {
      return prepareListLoading(state.accountCalculation.list.data, null);
    }

    case AccountAction.GET_ACCOUNT_CALCULATIONS_SUCCESS: {
      return prepareSuccess(action.data, null);
    }

    case AccountAction.GET_ACCOUNT_CALCULATIONS_FAILED: {
      return prepareListFailed(state.accountCalculation.list.data, null);
    }

    case AccountAction.CLEAR_LOCAL_DATA_ACCOUNT_CALCULATIONS: {
      return prepareSuccess(null, null);
    }

    case AccountAction.CALCULATE_ACCOUNT: {
      const list = state.accountCalculation.list;
      const edit = {
        isLoading: true,
        isRequestError: false,
      };
      return prepare(list, edit);
    }

    case AccountAction.CALCULATE_ACCOUNT_SUCCESS: {
      const list = state.accountCalculation.list;
      const edit = {
        isLoading: false,
        isRequestError: false,
      };
      return prepare(list, edit);
    }

    case AccountAction.CALCULATE_ACCOUNT_FAILED: {
      const list = state.accountCalculation.list;
      const edit = {
        isLoading: false,
        isRequestError: true,
      };
      return prepare(list, edit);
    }

    default:
      return state.accountCalculation;
  }
};

/* Selectors */
export const getAccountCalculationListData = state => state.accounts.accountCalculation.list.data;
export const getAccountCalculationIsLoading = state => state.accounts.accountCalculation.list.isLoading;
export const getAccountCalculationIsRequestError = state => state.accounts.accountCalculation.list.isRequestError;

export const accountIsCalculating = state => state.accounts.accountCalculation.edit.isLoading;
export const accountIsCalculatingError = state => state.accounts.accountCalculation.edit.isRequestError;
