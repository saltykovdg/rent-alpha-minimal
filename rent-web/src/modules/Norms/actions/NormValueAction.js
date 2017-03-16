export const GET_NORM_VALUES = 'GET_NORM_VALUES';
export const GET_NORM_VALUES_SUCCESS = 'GET_NORM_VALUES_SUCCESS';
export const GET_NORM_VALUES_FAILED = 'GET_NORM_VALUES_FAILED';
export const GET_NORM_VALUE = 'GET_NORM_VALUE';
export const GET_NORM_VALUE_SUCCESS = 'GET_NORM_VALUE_SUCCESS';
export const GET_NORM_VALUE_FAILED = 'GET_NORM_VALUE_FAILED';
export const SAVE_NORM_VALUE = 'SAVE_NORM_VALUE';
export const SAVE_NORM_VALUE_SUCCESS = 'SAVE_NORM_VALUE_SUCCESS';
export const SAVE_NORM_VALUE_FAILED = 'SAVE_NORM_VALUE_FAILED';
export const DELETE_NORM_VALUE = 'DELETE_NORM_VALUE';
export const DELETE_NORM_VALUE_SUCCESS = 'DELETE_NORM_VALUE_SUCCESS';
export const DELETE_NORM_VALUE_FAILED = 'DELETE_NORM_VALUE_FAILED';
export const NEW_NORM_VALUE = 'NEW_NORM_VALUE';

export const getNormValues = (page = 0) => {
  return {
    type: GET_NORM_VALUES,
    page,
  };
};

export const getNormValuesSuccess = (data) => {
  return {
    type: GET_NORM_VALUES_SUCCESS,
    data,
  };
};

export const getNormValuesFailed = () => {
  return {
    type: GET_NORM_VALUES_FAILED,
  };
};

export const getNormValue = (id) => {
  return {
    type: GET_NORM_VALUE,
    id,
  };
};

export const getNormValueSuccess = (data) => {
  return {
    type: GET_NORM_VALUE_SUCCESS,
    data,
  };
};

export const getNormValueFailed = (id) => {
  return {
    type: GET_NORM_VALUE_FAILED,
    id,
  };
};

export const saveNormValue = (object) => {
  return {
    type: SAVE_NORM_VALUE,
    object,
  };
};

export const saveNormValueSuccess = (data) => {
  return {
    type: SAVE_NORM_VALUE_SUCCESS,
    data,
  };
};

export const saveNormValueFailed = (data) => {
  return {
    type: SAVE_NORM_VALUE_FAILED,
    data,
  };
};

export const deleteNormValue = (object) => {
  return {
    type: DELETE_NORM_VALUE,
    object,
  };
};

export const deleteNormValueSuccess = (object) => {
  return {
    type: DELETE_NORM_VALUE_SUCCESS,
    object,
  };
};

export const deleteNormValueFailed = (data) => {
  return {
    type: DELETE_NORM_VALUE_FAILED,
    data,
  };
};

export const newNormValue = () => {
  return {
    type: NEW_NORM_VALUE,
  };
};
