import * as AccountAction from './../actions/AccountAction';
import { prepareList } from './../../../util/ReducerUtil';

export const accountCalculationReducer = (state, action) => {
  switch (action.type) {
    case AccountAction.GET_ACCOUNT_CALCULATIONS: {
      return prepareList(state.accountCalculation.list.data, null, true, false, false, false);
    }

    case AccountAction.GET_ACCOUNT_CALCULATIONS_SUCCESS: {
      return prepareList(action.data, null, false, false, false, false);
    }

    case AccountAction.GET_ACCOUNT_CALCULATIONS_FAILED: {
      return prepareList(state.accountCalculation.list.data, null, false, true, false, false);
    }

    case AccountAction.CLEAR_LOCAL_DATA_ACCOUNT_CALCULATIONS: {
      return prepareList(null, null, false, false, false, false);
    }

    default:
      return state.accountCalculation;
  }
};

/* Selectors */
export const getAccountCalculationListData = state => state.accounts.accountCalculation.list.data;
export const getAccountCalculationIsLoading = state => state.accounts.accountCalculation.list.isLoading;
export const getAccountCalculationIsRequestError = state => state.accounts.accountCalculation.list.isRequestError;
