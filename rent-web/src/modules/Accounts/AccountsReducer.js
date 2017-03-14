import {
  accountReducer,
  getAccountIsLoading,
  getAccountIsRequestError,
} from './reducers/AccountReducer';

import {
  accountParameterReducer,
  getAccountParameterIsLoading,
  getAccountParameterIsRequestError,
} from './reducers/AccountParameterReducer';

import {
  accountServiceReducer,
  getAccountServiceIsLoading,
  getAccountServiceIsRequestError,
} from './reducers/AccountServiceReducer';

import {
  accountOwnerReducer,
  getAccountOwnerIsLoading,
  getAccountOwnerIsRequestError,
} from './reducers/AccountOwnerReducer';

import {
  accountOwnerDocumentAttachmentReducer,
  getAccountOwnerDocumentAttachmentIsLoading,
  getAccountOwnerDocumentAttachmentIsRequestError,
} from './reducers/AccountOwnerDocumentAttachmentReducer';

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
  account: data,
  accountParameter: data,
  accountService: data,
  accountOwner: data,
  accountOwnerDocumentAttachment: data,
};

const AccountsReducer = (state = initialState, action) => {
  return {
    account: accountReducer(state, action),
    accountParameter: accountParameterReducer(state, action),
    accountService: accountServiceReducer(state, action),
    accountOwner: accountOwnerReducer(state, action),
    accountOwnerDocumentAttachment: accountOwnerDocumentAttachmentReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getAccountIsRequestError(state) || getAccountParameterIsRequestError(state) ||
             getAccountServiceIsRequestError(state) || getAccountOwnerIsRequestError(state) ||
             getAccountOwnerDocumentAttachmentIsRequestError(state);

export const getIsLoading = state => getAccountIsLoading(state) || getAccountParameterIsLoading(state) ||
             getAccountServiceIsLoading(state) || getAccountOwnerIsLoading(state) ||
             getAccountOwnerDocumentAttachmentIsLoading(state);

// Export Reducer
export default AccountsReducer;
