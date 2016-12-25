export const GET_ACCOUNTS = 'GET_ACCOUNTS';
export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS';
export const GET_ACCOUNTS_FAILED = 'GET_ACCOUNTS_FAILED';
export const GET_ACCOUNT = 'GET_ACCOUNT';
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS';
export const GET_ACCOUNT_FAILED = 'GET_ACCOUNT_FAILED';
export const SAVE_ACCOUNT = 'SAVE_ACCOUNT';
export const SAVE_ACCOUNT_SUCCESS = 'SAVE_ACCOUNT_SUCCESS';
export const SAVE_ACCOUNT_FAILED = 'SAVE_ACCOUNT_FAILED';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILED = 'DELETE_ACCOUNT_FAILED';
export const NEW_ACCOUNT = 'NEW_ACCOUNT';
export const FIND_ACCOUNTS_BY_ACCOUNT_NUMBER = 'FIND_ACCOUNTS_BY_ACCOUNT_NUMBER';

// parameters
export const ADD_NEW_PARAMETER_TO_ACCOUNT = 'ADD_NEW_PARAMETER_TO_ACCOUNT';
export const EDIT_PARAMETER_IN_ACCOUNT = 'EDIT_PARAMETER_IN_ACCOUNT';
export const REMOVE_PARAMETER_FROM_ACCOUNT = 'REMOVE_PARAMETER_FROM_ACCOUNT';

// services
export const ADD_NEW_SERVICE_TO_ACCOUNT = 'ADD_NEW_SERVICE_TO_ACCOUNT';
export const EDIT_SERVICE_IN_ACCOUNT = 'EDIT_SERVICE_IN_ACCOUNT';
export const REMOVE_SERVICE_FROM_ACCOUNT = 'REMOVE_SERVICE_FROM_ACCOUNT';

export const getAccounts = (page = 0) => {
  return {
    type: GET_ACCOUNTS,
    page,
  };
};

export const getAccountsSuccess = (data) => {
  return {
    type: GET_ACCOUNTS_SUCCESS,
    data,
  };
};

export const getAccountsFailed = () => {
  return {
    type: GET_ACCOUNTS_FAILED,
  };
};

export const getAccount = (id) => {
  return {
    type: GET_ACCOUNT,
    id,
  };
};

export const getAccountSuccess = (data) => {
  return {
    type: GET_ACCOUNT_SUCCESS,
    data,
  };
};

export const getAccountFailed = (id) => {
  return {
    type: GET_ACCOUNT_FAILED,
    id,
  };
};

export const saveAccount = (object) => {
  return {
    type: SAVE_ACCOUNT,
    object,
  };
};

export const saveAccountSuccess = (data) => {
  return {
    type: SAVE_ACCOUNT_SUCCESS,
    data,
  };
};

export const saveAccountFailed = (data, showError = true) => {
  return {
    type: SAVE_ACCOUNT_FAILED,
    data,
    showError,
  };
};

export const deleteAccount = (object) => {
  return {
    type: DELETE_ACCOUNT,
    object,
  };
};

export const deleteAccountSuccess = (object) => {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    object,
  };
};

export const deleteAccountFailed = (data) => {
  return {
    type: DELETE_ACCOUNT_FAILED,
    data,
  };
};

export const newAccount = () => {
  return {
    type: NEW_ACCOUNT,
  };
};

export const findAccountsByAccountNumber = (accountNumber = '', page = 0) => {
  return {
    type: FIND_ACCOUNTS_BY_ACCOUNT_NUMBER,
    accountNumber,
    page,
  };
};

// parameters
export const addNewParameterToAccount = (parameter) => {
  return {
    type: ADD_NEW_PARAMETER_TO_ACCOUNT,
    parameter,
  };
};
export const editParameterInAccount = (parameter) => {
  return {
    type: EDIT_PARAMETER_IN_ACCOUNT,
    parameter,
  };
};
export const removeParameterFromAccount = (parameter) => {
  return {
    type: REMOVE_PARAMETER_FROM_ACCOUNT,
    parameter,
  };
};

// services
export const addNewServiceToAccount = (service) => {
  return {
    type: ADD_NEW_SERVICE_TO_ACCOUNT,
    service,
  };
};
export const editServiceInAccount = (service) => {
  return {
    type: EDIT_SERVICE_IN_ACCOUNT,
    service,
  };
};
export const removeServiceFromAccount = (service) => {
  return {
    type: REMOVE_SERVICE_FROM_ACCOUNT,
    service,
  };
};
