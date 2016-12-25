export const GET_ACCOUNT_SERVICES = 'GET_ACCOUNT_SERVICES';
export const GET_ACCOUNT_SERVICES_SUCCESS = 'GET_ACCOUNT_SERVICES_SUCCESS';
export const GET_ACCOUNT_SERVICES_FAILED = 'GET_ACCOUNT_SERVICES_FAILED';
export const GET_ACCOUNT_SERVICE = 'GET_ACCOUNT_SERVICE';
export const GET_ACCOUNT_SERVICE_SUCCESS = 'GET_ACCOUNT_SERVICE_SUCCESS';
export const GET_ACCOUNT_SERVICE_FAILED = 'GET_ACCOUNT_SERVICE_FAILED';
export const SAVE_ACCOUNT_SERVICE = 'SAVE_ACCOUNT_SERVICE';
export const SAVE_ACCOUNT_SERVICE_SUCCESS = 'SAVE_ACCOUNT_SERVICE_SUCCESS';
export const SAVE_ACCOUNT_SERVICE_FAILED = 'SAVE_ACCOUNT_SERVICE_FAILED';
export const DELETE_ACCOUNT_SERVICE = 'DELETE_ACCOUNT_SERVICE';
export const DELETE_ACCOUNT_SERVICE_SUCCESS = 'DELETE_ACCOUNT_SERVICE_SUCCESS';
export const DELETE_ACCOUNT_SERVICE_FAILED = 'DELETE_ACCOUNT_SERVICE_FAILED';
export const NEW_ACCOUNT_SERVICE = 'NEW_ACCOUNT_SERVICE';

export const getAccountServices = (page = 0) => {
  return {
    type: GET_ACCOUNT_SERVICES,
    page,
  };
};

export const getAccountServicesSuccess = (data) => {
  return {
    type: GET_ACCOUNT_SERVICES_SUCCESS,
    data,
  };
};

export const getAccountServicesFailed = () => {
  return {
    type: GET_ACCOUNT_SERVICES_FAILED,
  };
};

export const getAccountService = (id) => {
  return {
    type: GET_ACCOUNT_SERVICE,
    id,
  };
};

export const getAccountServiceSuccess = (data) => {
  return {
    type: GET_ACCOUNT_SERVICE_SUCCESS,
    data,
  };
};

export const getAccountServiceFailed = (id) => {
  return {
    type: GET_ACCOUNT_SERVICE_FAILED,
    id,
  };
};

export const saveAccountService = (object) => {
  return {
    type: SAVE_ACCOUNT_SERVICE,
    object,
  };
};

export const saveAccountServiceSuccess = (data) => {
  return {
    type: SAVE_ACCOUNT_SERVICE_SUCCESS,
    data,
  };
};

export const saveAccountServiceFailed = (data) => {
  return {
    type: SAVE_ACCOUNT_SERVICE_FAILED,
    data,
  };
};

export const deleteAccountService = (object) => {
  return {
    type: DELETE_ACCOUNT_SERVICE,
    object,
  };
};

export const deleteAccountServiceSuccess = (object) => {
  return {
    type: DELETE_ACCOUNT_SERVICE_SUCCESS,
    object,
  };
};

export const deleteAccountServiceFailed = (data) => {
  return {
    type: DELETE_ACCOUNT_SERVICE_FAILED,
    data,
  };
};

export const newAccountService = () => {
  return {
    type: NEW_ACCOUNT_SERVICE,
  };
};
