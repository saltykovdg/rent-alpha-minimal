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

import {
  citizenDocumentAttachmentReducer,
  getCitizenDocumentAttachmentIsLoading,
  getCitizenDocumentAttachmentIsRequestError,
} from './reducers/CitizenDocumentAttachmentReducer';

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
  citizenDocumentAttachment: data,
};

const CitizensReducer = (state = initialState, action) => {
  return {
    citizen: citizenReducer(state, action),
    citizenDocument: citizenDocumentReducer(state, action),
    citizenDocumentAttachment: citizenDocumentAttachmentReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getCitizenIsRequestError(state) || getCitizenDocumentIsRequestError(state) ||
                                          getCitizenDocumentAttachmentIsRequestError(state);

export const getIsLoading = state => getCitizenIsLoading(state) || getCitizenDocumentIsLoading(state) ||
                                     getCitizenDocumentAttachmentIsLoading(state);

// Export Reducer
export default CitizensReducer;
