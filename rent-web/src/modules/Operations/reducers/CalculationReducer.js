import * as CalculationAction from './../actions/CalculationAction';

export const calculationReducer = (state, action) => {
  switch (action.type) {
    case CalculationAction.CLOSE_WORKING_PERIOD:
    case CalculationAction.CALCULATE_ACCOUNTS: {
      const calculation = state.calculation;
      calculation.isLoading = true;
      calculation.isRequestError = false;
      return state.calculation;
    }

    case CalculationAction.CLOSE_WORKING_PERIOD_SUCCESS:
    case CalculationAction.CALCULATE_ACCOUNTS_SUCCESS: {
      const calculation = state.calculation;
      calculation.isLoading = false;
      calculation.isRequestError = false;
      return state.calculation;
    }

    case CalculationAction.CLOSE_WORKING_PERIOD_FAILED:
    case CalculationAction.CALCULATE_ACCOUNTS_FAILED: {
      const calculation = state.calculation;
      calculation.isLoading = false;
      calculation.isRequestError = true;
      return state.calculation;
    }

    default:
      return state.calculation;
  }
};

/* Selectors */
export const getCalculationIsLoading = state => state.operations.calculation.isLoading;
export const getCalculationIsRequestError = state => state.operations.calculation.isRequestError;
