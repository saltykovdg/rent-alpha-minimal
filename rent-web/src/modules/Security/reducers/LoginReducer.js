import * as LoginAction from './../actions/LoginAction';

export const loginReducer = (state, action) => {
  switch (action.type) {
    case LoginAction.LOGIN: {
      const login = state.login;
      login.isLoading = true;
      login.isRequestError = false;
      return state.login;
    }

    case LoginAction.LOGIN_SUCCESS: {
      const login = state.login;
      login.data = action.data;
      login.isLoading = false;
      login.isRequestError = false;
      return state.login;
    }

    case LoginAction.LOGIN_FAILED: {
      const login = state.login;
      login.isLoading = false;
      login.isRequestError = true;
      return state.login;
    }

    default:
      return state.login;
  }
};

/* Selectors */
export const getLoginData = state => state.security.login.data;
export const getLoginIsLoading = state => state.security.login.isLoading;
export const getLoginIsRequestError = state => state.security.login.isRequestError;
