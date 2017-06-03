import {
  loginReducer,
  getLoginIsLoading,
  getLoginIsRequestError,
} from './reducers/LoginReducer';

import {
  userReducer,
} from './reducers/UserReducer';

import {
  roleReducer,
} from './reducers/RoleReducer';

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

const loginData = {
  data: null,
  isLoading: false,
  isRequestError: false,
};

const initialState = {
  login: loginData,
  user: data,
  role: data,
};

const SecurityReducer = (state = initialState, action) => {
  return {
    login: loginReducer(state, action),
    user: userReducer(state, action),
    role: roleReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getLoginIsRequestError(state);
export const getIsLoading = state => getLoginIsLoading(state);

// Export Reducer
export default SecurityReducer;
