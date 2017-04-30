import * as CalculationAction from './../actions/CalculationAction';

export const calculationReducer = (state, action) => {
  switch (action.type) {
    case CalculationAction.CALCULATE_ACCOUNTS: {
      const calculations = state.calculation.calculations;
      calculations.isLoading = true;
      calculations.isRequestError = false;
      return state.calculation;
    }

    case CalculationAction.CALCULATE_ACCOUNTS_SUCCESS: {
      const calculations = state.calculation.calculations;
      calculations.isLoading = false;
      calculations.isRequestError = false;
      return state.calculation;
    }

    case CalculationAction.CALCULATE_ACCOUNTS_FAILED: {
      const calculations = state.calculation.calculations;
      calculations.isLoading = false;
      calculations.isRequestError = true;
      return state.calculation;
    }

    default:
      return state.calculation;
  }
};

/* Selectors */
export const getCalculationIsLoading = state => state.operations.calculation.calculations.isLoading;
export const getCalculationIsRequestError = state => state.operations.calculation.calculations.isRequestError;
