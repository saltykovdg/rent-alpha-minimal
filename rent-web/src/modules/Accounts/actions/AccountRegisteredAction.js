export const GET_ACCOUNT_REGISTEREDS = 'GET_ACCOUNT_REGISTEREDS';
export const GET_ACCOUNT_REGISTEREDS_SUCCESS = 'GET_ACCOUNT_REGISTEREDS_SUCCESS';
export const GET_ACCOUNT_REGISTEREDS_FAILED = 'GET_ACCOUNT_REGISTEREDS_FAILED';
export const GET_ACCOUNT_REGISTERED = 'GET_ACCOUNT_REGISTERED';
export const GET_ACCOUNT_REGISTERED_SUCCESS = 'GET_ACCOUNT_REGISTERED_SUCCESS';
export const GET_ACCOUNT_REGISTERED_FAILED = 'GET_ACCOUNT_REGISTERED_FAILED';
export const SAVE_ACCOUNT_REGISTERED = 'SAVE_ACCOUNT_REGISTERED';
export const SAVE_ACCOUNT_REGISTERED_SUCCESS = 'SAVE_ACCOUNT_REGISTERED_SUCCESS';
export const SAVE_ACCOUNT_REGISTERED_FAILED = 'SAVE_ACCOUNT_REGISTERED_FAILED';
export const DELETE_ACCOUNT_REGISTERED = 'DELETE_ACCOUNT_REGISTERED';
export const DELETE_ACCOUNT_REGISTERED_SUCCESS = 'DELETE_ACCOUNT_REGISTERED_SUCCESS';
export const DELETE_ACCOUNT_REGISTERED_FAILED = 'DELETE_ACCOUNT_REGISTERED_FAILED';
export const NEW_ACCOUNT_REGISTERED = 'NEW_ACCOUNT_REGISTERED';

export const getAccountRegistereds = (page = 0) => {
  return {
    type: GET_ACCOUNT_REGISTEREDS,
    page,
  };
};

export const getAccountRegisteredsSuccess = (data) => {
  return {
    type: GET_ACCOUNT_REGISTEREDS_SUCCESS,
    data,
  };
};

export const getAccountRegisteredsFailed = () => {
  return {
    type: GET_ACCOUNT_REGISTEREDS_FAILED,
  };
};

export const getAccountRegistered = (id) => {
  return {
    type: GET_ACCOUNT_REGISTERED,
    id,
  };
};

export const getAccountRegisteredSuccess = (data) => {
  return {
    type: GET_ACCOUNT_REGISTERED_SUCCESS,
    data,
  };
};

export const getAccountRegisteredFailed = (id) => {
  return {
    type: GET_ACCOUNT_REGISTERED_FAILED,
    id,
  };
};

export const saveAccountRegistered = (object) => {
  return {
    type: SAVE_ACCOUNT_REGISTERED,
    object,
  };
};

export const saveAccountRegisteredSuccess = (data) => {
  return {
    type: SAVE_ACCOUNT_REGISTERED_SUCCESS,
    data,
  };
};

export const saveAccountRegisteredFailed = (data) => {
  return {
    type: SAVE_ACCOUNT_REGISTERED_FAILED,
    data,
  };
};

export const deleteAccountRegistered = (object) => {
  return {
    type: DELETE_ACCOUNT_REGISTERED,
    object,
  };
};

export const deleteAccountRegisteredSuccess = (object) => {
  return {
    type: DELETE_ACCOUNT_REGISTERED_SUCCESS,
    object,
  };
};

export const deleteAccountRegisteredFailed = (data) => {
  return {
    type: DELETE_ACCOUNT_REGISTERED_FAILED,
    data,
  };
};

export const newAccountRegistered = () => {
  return {
    type: NEW_ACCOUNT_REGISTERED,
  };
};
