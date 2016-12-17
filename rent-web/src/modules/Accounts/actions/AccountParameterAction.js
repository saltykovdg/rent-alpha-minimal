export const GET_ACCOUNT_PARAMETERS = 'GET_ACCOUNT_PARAMETERS';
export const GET_ACCOUNT_PARAMETERS_SUCCESS = 'GET_ACCOUNT_PARAMETERS_SUCCESS';
export const GET_ACCOUNT_PARAMETERS_FAILED = 'GET_ACCOUNT_PARAMETERS_FAILED';
export const GET_ACCOUNT_PARAMETER = 'GET_ACCOUNT_PARAMETER';
export const GET_ACCOUNT_PARAMETER_SUCCESS = 'GET_ACCOUNT_PARAMETER_SUCCESS';
export const GET_ACCOUNT_PARAMETER_FAILED = 'GET_ACCOUNT_PARAMETER_FAILED';
export const SAVE_ACCOUNT_PARAMETER = 'SAVE_ACCOUNT_PARAMETER';
export const SAVE_ACCOUNT_PARAMETER_SUCCESS = 'SAVE_ACCOUNT_PARAMETER_SUCCESS';
export const SAVE_ACCOUNT_PARAMETER_FAILED = 'SAVE_ACCOUNT_PARAMETER_FAILED';
export const DELETE_ACCOUNT_PARAMETER = 'DELETE_ACCOUNT_PARAMETER';
export const DELETE_ACCOUNT_PARAMETER_SUCCESS = 'DELETE_ACCOUNT_PARAMETER_SUCCESS';
export const DELETE_ACCOUNT_PARAMETER_FAILED = 'DELETE_ACCOUNT_PARAMETER_FAILED';
export const NEW_ACCOUNT_PARAMETER = 'NEW_ACCOUNT_PARAMETER';

export const getAccountParameters = (page = 0) => {
  return {
    type: GET_ACCOUNT_PARAMETERS,
    page,
  };
};

export const getAccountParametersSuccess = (data) => {
  return {
    type: GET_ACCOUNT_PARAMETERS_SUCCESS,
    data,
  };
};

export const getAccountParametersFailed = () => {
  return {
    type: GET_ACCOUNT_PARAMETERS_FAILED,
  };
};

export const getAccountParameter = (id) => {
  return {
    type: GET_ACCOUNT_PARAMETER,
    id,
  };
};

export const getAccountParameterSuccess = (data) => {
  return {
    type: GET_ACCOUNT_PARAMETER_SUCCESS,
    data,
  };
};

export const getAccountParameterFailed = (id) => {
  return {
    type: GET_ACCOUNT_PARAMETER_FAILED,
    id,
  };
};

export const saveAccountParameter = (object) => {
  return {
    type: SAVE_ACCOUNT_PARAMETER,
    object,
  };
};

export const saveAccountParameterSuccess = (data) => {
  return {
    type: SAVE_ACCOUNT_PARAMETER_SUCCESS,
    data,
  };
};

export const saveAccountParameterFailed = (data) => {
  return {
    type: SAVE_ACCOUNT_PARAMETER_FAILED,
    data,
  };
};

export const deleteAccountParameter = (object) => {
  return {
    type: DELETE_ACCOUNT_PARAMETER,
    object,
  };
};

export const deleteAccountParameterSuccess = (object) => {
  return {
    type: DELETE_ACCOUNT_PARAMETER_SUCCESS,
    object,
  };
};

export const deleteAccountParameterFailed = (data) => {
  return {
    type: DELETE_ACCOUNT_PARAMETER_FAILED,
    data,
  };
};

export const newAccountParameter = () => {
  return {
    type: NEW_ACCOUNT_PARAMETER,
  };
};
