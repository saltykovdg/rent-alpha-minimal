import {
  citizenReducer,
  getCitizenIsLoading,
  getCitizenIsRequestError,
} from './reducers/CitizenReducer';

import {
  citizenDocumentReducer,
  getCitizenDocumentIsLoading,
  getCitizenDocumentIsRequestError,
} from './reducers/CitizenDocumentReducer';

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
  citizen: data,
  citizenDocument: data,
};

const CitizensReducer = (state = initialState, action) => {
  return {
    citizen: citizenReducer(state, action),
    citizenDocument: citizenDocumentReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getCitizenIsRequestError(state) || getCitizenDocumentIsRequestError(state);
export const getIsLoading = state => getCitizenIsLoading(state) || getCitizenDocumentIsLoading(state);

// Export Reducer
export default CitizensReducer;
