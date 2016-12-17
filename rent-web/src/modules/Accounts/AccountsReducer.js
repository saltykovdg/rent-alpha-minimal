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
};

const AccountsReducer = (state = initialState, action) => {
  return {
    account: accountReducer(state, action),
    accountParameter: accountParameterReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getAccountIsRequestError(state) || getAccountParameterIsRequestError(state);
export const getIsLoading = state => getAccountIsLoading(state) || getAccountParameterIsLoading(state);

// Export Reducer
export default AccountsReducer;
