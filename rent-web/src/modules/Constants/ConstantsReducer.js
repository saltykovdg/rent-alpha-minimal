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

import {
  genderTypeReducer,
  getGenderTypeIsLoading,
  getGenderTypeIsRequestError,
} from './reducers/GenderTypeReducer';

import {
  registrationTypeReducer,
  getRegistrationTypeIsLoading,
  getRegistrationTypeIsRequestError,
} from './reducers/RegistrationTypeReducer';

import {
  meterTypeReducer,
  getMeterTypeIsLoading,
  getMeterTypeIsRequestError,
} from './reducers/MeterTypeReducer';

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
  genderType: data,
  registrationType: data,
  meterType: data,
};

const ConstantsReducer = (state = initialState, action) => {
  return {
    calculationType: calculationTypeReducer(state, action),
    measurementUnit: measurementUnitReducer(state, action),
    parameterType: parameterTypeReducer(state, action),
    documentType: documentTypeReducer(state, action),
    genderType: genderTypeReducer(state, action),
    registrationType: registrationTypeReducer(state, action),
    meterType: meterTypeReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state =>
  getCalculationTypeIsRequestError(state) || getMeasurementUnitIsRequestError(state) ||
  getParameterTypeIsRequestError(state) || getDocumentTypeIsRequestError(state) ||
  getGenderTypeIsRequestError(state) || getRegistrationTypeIsRequestError(state) ||
  getMeterTypeIsRequestError(state);

export const getIsLoading = state =>
  getCalculationTypeIsLoading(state) || getMeasurementUnitIsLoading(state) ||
  getParameterTypeIsLoading(state) || getDocumentTypeIsLoading(state) ||
  getGenderTypeIsLoading(state) || getRegistrationTypeIsLoading(state) ||
  getMeterTypeIsLoading(state);

// Export Reducer
export default ConstantsReducer;
