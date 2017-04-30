import {
  calculationReducer,
  getCalculationIsLoading,
  getCalculationIsRequestError,
} from './reducers/CalculationReducer';

// Initial State
const data = {
  calculations: {
    isLoading: false,
    isRequestError: false,
  },
};

const initialState = {
  calculation: data,
};

const OperationsReducer = (state = initialState, action) => {
  return {
    calculation: calculationReducer(state, action),
  };
};

/* Selectors */
export const getIsLoading = state => getCalculationIsLoading(state);
export const getIsRequestError = state => getCalculationIsRequestError(state);

// Export Reducer
export default OperationsReducer;
