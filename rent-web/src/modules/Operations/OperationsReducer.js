import {
  calculationReducer,
  getCalculationIsLoading,
  getCalculationIsRequestError,
} from './reducers/CalculationReducer';

import {
  systemPropertyReducer,
  getSystemPropertyIsLoading,
  getSystemPropertyIsRequestError,
} from './reducers/SystemPropertyReducer';

// Initial State
const calculationData = {
  isLoading: false,
  isRequestError: false,
};
const systemPropertyData = {
  data: null,
  isLoading: false,
  isRequestError: false,
};

const initialState = {
  calculation: calculationData,
  systemProperty: systemPropertyData,
};

const OperationsReducer = (state = initialState, action) => {
  return {
    calculation: calculationReducer(state, action),
    systemProperty: systemPropertyReducer(state, action),
  };
};

/* Selectors */
export const getIsLoading = state => getCalculationIsLoading(state);
export const getIsRequestError = state => getCalculationIsRequestError(state);

// Export Reducer
export default OperationsReducer;
