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
};

const ConstantsReducer = (state = initialState, action) => {
  return {
    calculationType: calculationTypeReducer(state, action),
    measurementUnit: measurementUnitReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getCalculationTypeIsRequestError(state) || getMeasurementUnitIsRequestError(state);
export const getIsLoading = state => getCalculationTypeIsLoading(state) || getMeasurementUnitIsLoading(state);

// Export Reducer
export default ConstantsReducer;
