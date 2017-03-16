import {
  normReducer,
  getNormIsLoading,
  getNormIsRequestError,
} from './reducers/NormReducer';

import {
  normValueReducer,
  getNormValueIsLoading,
  getNormValueIsRequestError,
} from './reducers/NormValueReducer';

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
  norm: data,
  normValue: data,
};

const NormsReducer = (state = initialState, action) => {
  return {
    norm: normReducer(state, action),
    normValue: normValueReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getNormIsRequestError(state) || getNormValueIsRequestError(state);
export const getIsLoading = state => getNormIsLoading(state) || getNormValueIsLoading(state);

// Export Reducer
export default NormsReducer;
