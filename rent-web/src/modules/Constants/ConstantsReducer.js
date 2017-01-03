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

import {
  documentTypeReducer,
  getDocumentTypeIsLoading,
  getDocumentTypeIsRequestError,
} from './reducers/DocumentTypeReducer';

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
  documentType: data,
};

const ConstantsReducer = (state = initialState, action) => {
  return {
    calculationType: calculationTypeReducer(state, action),
    measurementUnit: measurementUnitReducer(state, action),
    parameterType: parameterTypeReducer(state, action),
    documentType: documentTypeReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state =>
  getCalculationTypeIsRequestError(state) ||
  getMeasurementUnitIsRequestError(state) ||
  getParameterTypeIsRequestError(state) ||
  getDocumentTypeIsRequestError(state);

export const getIsLoading = state =>
  getCalculationTypeIsLoading(state) ||
  getMeasurementUnitIsLoading(state) ||
  getParameterTypeIsLoading(state) ||
  getDocumentTypeIsLoading(state);

// Export Reducer
export default ConstantsReducer;
