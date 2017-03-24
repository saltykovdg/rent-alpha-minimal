export const GET_NORMS = 'GET_NORMS';
export const GET_NORMS_SUCCESS = 'GET_NORMS_SUCCESS';
export const GET_NORMS_FAILED = 'GET_NORMS_FAILED';
export const GET_NORM = 'GET_NORM';
export const GET_NORM_SUCCESS = 'GET_NORM_SUCCESS';
export const GET_NORM_FAILED = 'GET_NORM_FAILED';
export const SAVE_NORM = 'SAVE_NORM';
export const SAVE_NORM_SUCCESS = 'SAVE_NORM_SUCCESS';
export const SAVE_NORM_FAILED = 'SAVE_NORM_FAILED';
export const DELETE_NORM = 'DELETE_NORM';
export const DELETE_NORM_SUCCESS = 'DELETE_NORM_SUCCESS';
export const DELETE_NORM_FAILED = 'DELETE_NORM_FAILED';
export const NEW_NORM = 'NEW_NORM';
export const FIND_NORMS_BY_SERVICE_ID = 'FIND_NORMS_BY_SERVICE_ID';

// norm values
export const ADD_NEW_VALUE_TO_NORM = 'ADD_NEW_VALUE_TO_NORM';
export const EDIT_VALUE_IN_NORM = 'EDIT_VALUE_IN_NORM';
export const REMOVE_VALUE_FROM_NORM = 'REMOVE_VALUE_FROM_NORM';

export const getNorms = (page = 0) => {
  return {
    type: GET_NORMS,
    page,
  };
};

export const getNormsSuccess = (data) => {
  return {
    type: GET_NORMS_SUCCESS,
    data,
  };
};

export const getNormsFailed = () => {
  return {
    type: GET_NORMS_FAILED,
  };
};

export const getNorm = (id) => {
  return {
    type: GET_NORM,
    id,
  };
};

export const getNormSuccess = (data) => {
  return {
    type: GET_NORM_SUCCESS,
    data,
  };
};

export const getNormFailed = (id) => {
  return {
    type: GET_NORM_FAILED,
    id,
  };
};

export const saveNorm = (object) => {
  return {
    type: SAVE_NORM,
    object,
  };
};

export const saveNormSuccess = (data) => {
  return {
    type: SAVE_NORM_SUCCESS,
    data,
  };
};

export const saveNormFailed = (data) => {
  return {
    type: SAVE_NORM_FAILED,
    data,
  };
};

export const deleteNorm = (object) => {
  return {
    type: DELETE_NORM,
    object,
  };
};

export const deleteNormSuccess = (object) => {
  return {
    type: DELETE_NORM_SUCCESS,
    object,
  };
};

export const deleteNormFailed = (data) => {
  return {
    type: DELETE_NORM_FAILED,
    data,
  };
};

export const newNorm = () => {
  return {
    type: NEW_NORM,
  };
};

export const findNormsByServiceId = (serviceId = '') => {
  return {
    type: FIND_NORMS_BY_SERVICE_ID,
    serviceId,
  };
};

// norm values
export const addNewValueToNorm = (normValue) => {
  return {
    type: ADD_NEW_VALUE_TO_NORM,
    normValue,
  };
};
export const editValueInNorm = (normValue) => {
  return {
    type: EDIT_VALUE_IN_NORM,
    normValue,
  };
};
export const removeValueFromNorm = (normValue) => {
  return {
    type: REMOVE_VALUE_FROM_NORM,
    normValue,
  };
};
