import {
  calculationTypeReducer,
  getCalculationTypeIsLoading,
  getCalculationTypeIsRequestError,
} from './reducers/CalculationTypeReducer';

import {
  measurementUnitReducer,
  getMeasurementUnitIsLoading,
  getMeasurementUnitIsRequestError,
} from './reducers/MeasurementUnitReducer';

import {
  parameterTypeReducer,
  getParameterTypeIsLoading,
  getParameterTypeIsRequestError,
} from './reducers/ParameterTypeReducer';

// Initial State
const data = {
  list: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  edit: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  isSaved: false,
  isDeleted: false,
};

const initialState = {
  calculationType: data,
  measurementUnit: data,
  parameterType: data,
};

const ConstantsReducer = (state = initialState, action) => {
  return {
    calculationType: calculationTypeReducer(state, action),
    measurementUnit: measurementUnitReducer(state, action),
    parameterType: parameterTypeReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state =>
  getCalculationTypeIsRequestError(state) ||
  getMeasurementUnitIsRequestError(state) ||
  getParameterTypeIsRequestError(state);

export const getIsLoading = state =>
  getCalculationTypeIsLoading(state) ||
  getMeasurementUnitIsLoading(state) ||
  getParameterTypeIsLoading(state);

// Export Reducer
export default ConstantsReducer;
