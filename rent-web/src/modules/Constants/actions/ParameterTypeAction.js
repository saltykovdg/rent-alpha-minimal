export const GET_PARAMETER_TYPES = 'GET_PARAMETER_TYPES';
export const GET_PARAMETER_TYPES_SUCCESS = 'GET_PARAMETER_TYPES_SUCCESS';
export const GET_PARAMETER_TYPES_FAILED = 'GET_PARAMETER_TYPES_FAILED';
export const GET_PARAMETER_TYPE = 'GET_PARAMETER_TYPE';
export const GET_PARAMETER_TYPE_SUCCESS = 'GET_PARAMETER_TYPE_SUCCESS';
export const GET_PARAMETER_TYPE_FAILED = 'GET_PARAMETER_TYPE_FAILED';
export const SAVE_PARAMETER_TYPE = 'SAVE_PARAMETER_TYPE';
export const SAVE_PARAMETER_TYPE_SUCCESS = 'SAVE_PARAMETER_TYPE_SUCCESS';
export const SAVE_PARAMETER_TYPE_FAILED = 'SAVE_PARAMETER_TYPE_FAILED';
export const DELETE_PARAMETER_TYPE = 'DELETE_PARAMETER_TYPE';
export const DELETE_PARAMETER_TYPE_SUCCESS = 'DELETE_PARAMETER_TYPE_SUCCESS';
export const DELETE_PARAMETER_TYPE_FAILED = 'DELETE_PARAMETER_TYPE_FAILED';
export const NEW_PARAMETER_TYPE = 'NEW_PARAMETER_TYPE';
export const FIND_PARAMETER_TYPES_BY_NAME = 'FIND_PARAMETER_TYPES_BY_NAME';

export const getParameterTypes = (page = 0) => {
  return {
    type: GET_PARAMETER_TYPES,
    page,
  };
};

export const getParameterTypesSuccess = (data) => {
  return {
    type: GET_PARAMETER_TYPES_SUCCESS,
    data,
  };
};

export const getParameterTypesFailed = () => {
  return {
    type: GET_PARAMETER_TYPES_FAILED,
  };
};

export const getParameterType = (id) => {
  return {
    type: GET_PARAMETER_TYPE,
    id,
  };
};

export const getParameterTypeSuccess = (data) => {
  return {
    type: GET_PARAMETER_TYPE_SUCCESS,
    data,
  };
};

export const getParameterTypeFailed = (id) => {
  return {
    type: GET_PARAMETER_TYPE_FAILED,
    id,
  };
};

export const saveParameterType = (object) => {
  return {
    type: SAVE_PARAMETER_TYPE,
    object,
  };
};

export const saveParameterTypeSuccess = (data) => {
  return {
    type: SAVE_PARAMETER_TYPE_SUCCESS,
    data,
  };
};

export const saveParameterTypeFailed = (data) => {
  return {
    type: SAVE_PARAMETER_TYPE_FAILED,
    data,
  };
};

export const deleteParameterType = (object, page = 0) => {
  return {
    type: DELETE_PARAMETER_TYPE,
    object,
    page,
  };
};

export const deleteParameterTypeSuccess = (object) => {
  return {
    type: DELETE_PARAMETER_TYPE_SUCCESS,
    object,
  };
};

export const deleteParameterTypeFailed = (data) => {
  return {
    type: DELETE_PARAMETER_TYPE_FAILED,
    data,
  };
};

export const newParameterType = () => {
  return {
    type: NEW_PARAMETER_TYPE,
  };
};

export const findParameterTypesByName = (name = '') => {
  return {
    type: FIND_PARAMETER_TYPES_BY_NAME,
    name,
  };
};
