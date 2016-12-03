import {
  accountReducer,
  getAccountIsLoading,
  getAccountIsRequestError,
} from './reducers/AccountReducer';

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
};

const AccountsReducer = (state = initialState, action) => {
  return {
    account: accountReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getAccountIsRequestError(state);
export const getIsLoading = state => getAccountIsLoading(state);

// Export Reducer
export default AccountsReducer;
