export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const login = (object) => {
  return {
    type: LOGIN,
    object,
  };
};
export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
};
export const loginFailed = () => {
  return {
    type: LOGIN_FAILED,
  };
};
