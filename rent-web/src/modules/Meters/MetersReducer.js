import {
  meterReducer,
  getMeterIsLoading,
  getMeterIsRequestError,
} from './reducers/MeterReducer';

import {
  meterValueReducer,
  getMeterValueIsLoading,
  getMeterValueIsRequestError,
} from './reducers/MeterValueReducer';

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
  meter: data,
  meterValue: data,
};

const MetersReducer = (state = initialState, action) => {
  return {
    meter: meterReducer(state, action),
    meterValue: meterValueReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getMeterIsRequestError(state) || getMeterValueIsRequestError(state);
export const getIsLoading = state => getMeterIsLoading(state) || getMeterValueIsLoading(state);

// Export Reducer
export default MetersReducer;
