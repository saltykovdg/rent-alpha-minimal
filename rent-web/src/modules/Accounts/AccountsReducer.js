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

import {
  accountRegisteredReducer,
  getAccountRegisteredIsLoading,
  getAccountRegisteredIsRequestError,
} from './reducers/AccountRegisteredReducer';

import {
  accountRegisteredDocumentAttachmentReducer,
  getAccountRegisteredDocumentAttachmentIsLoading,
  getAccountRegisteredDocumentAttachmentIsRequestError,
} from './reducers/AccountRegisteredDocumentAttachmentReducer';

import {
  accountMeterReducer,
  getAccountMeterIsLoading,
  getAccountMeterIsRequestError,
} from './reducers/AccountMeterReducer';

import {
  accountCalculationReducer,
  getAccountCalculationIsRequestError,
} from './reducers/AccountCalculationsReducer';

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
  accountRegistered: data,
  accountRegisteredDocumentAttachment: data,
  accountMeter: data,
  accountCalculation: data,
};

const AccountsReducer = (state = initialState, action) => {
  return {
    account: accountReducer(state, action),
    accountParameter: accountParameterReducer(state, action),
    accountService: accountServiceReducer(state, action),
    accountOwner: accountOwnerReducer(state, action),
    accountOwnerDocumentAttachment: accountOwnerDocumentAttachmentReducer(state, action),
    accountRegistered: accountRegisteredReducer(state, action),
    accountRegisteredDocumentAttachment: accountRegisteredDocumentAttachmentReducer(state, action),
    accountMeter: accountMeterReducer(state, action),
    accountCalculation: accountCalculationReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getAccountIsRequestError(state) || getAccountParameterIsRequestError(state) ||
             getAccountServiceIsRequestError(state) || getAccountOwnerIsRequestError(state) ||
             getAccountOwnerDocumentAttachmentIsRequestError(state) || getAccountRegisteredIsRequestError(state) ||
             getAccountRegisteredDocumentAttachmentIsRequestError(state) || getAccountMeterIsRequestError(state) ||
             getAccountCalculationIsRequestError(state);

export const getIsLoading = state => getAccountIsLoading(state) || getAccountParameterIsLoading(state) ||
             getAccountServiceIsLoading(state) || getAccountOwnerIsLoading(state) ||
             getAccountOwnerDocumentAttachmentIsLoading(state) || getAccountRegisteredIsLoading(state) ||
             getAccountRegisteredDocumentAttachmentIsLoading(state) || getAccountMeterIsLoading(state);

// Export Reducer
export default AccountsReducer;
