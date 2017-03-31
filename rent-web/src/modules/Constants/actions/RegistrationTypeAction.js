export const GET_REGISTRATION_TYPES = 'GET_REGISTRATION_TYPES';
export const GET_REGISTRATION_TYPES_SUCCESS = 'GET_REGISTRATION_TYPES_SUCCESS';
export const GET_REGISTRATION_TYPES_FAILED = 'GET_REGISTRATION_TYPES_FAILED';
export const GET_REGISTRATION_TYPE = 'GET_REGISTRATION_TYPE';
export const GET_REGISTRATION_TYPE_SUCCESS = 'GET_REGISTRATION_TYPE_SUCCESS';
export const GET_REGISTRATION_TYPE_FAILED = 'GET_REGISTRATION_TYPE_FAILED';
export const SAVE_REGISTRATION_TYPE = 'SAVE_REGISTRATION_TYPE';
export const SAVE_REGISTRATION_TYPE_SUCCESS = 'SAVE_REGISTRATION_TYPE_SUCCESS';
export const SAVE_REGISTRATION_TYPE_FAILED = 'SAVE_REGISTRATION_TYPE_FAILED';
export const DELETE_REGISTRATION_TYPE = 'DELETE_REGISTRATION_TYPE';
export const DELETE_REGISTRATION_TYPE_SUCCESS = 'DELETE_REGISTRATION_TYPE_SUCCESS';
export const DELETE_REGISTRATION_TYPE_FAILED = 'DELETE_REGISTRATION_TYPE_FAILED';
export const NEW_REGISTRATION_TYPE = 'NEW_REGISTRATION_TYPE';
export const FIND_REGISTRATION_TYPES_BY_NAME = 'FIND_REGISTRATION_TYPES_BY_NAME';

export const getRegistrationTypes = (page = 0) => {
  return {
    type: GET_REGISTRATION_TYPES,
    page,
  };
};

export const getRegistrationTypesSuccess = (data) => {
  return {
    type: GET_REGISTRATION_TYPES_SUCCESS,
    data,
  };
};

export const getRegistrationTypesFailed = () => {
  return {
    type: GET_REGISTRATION_TYPES_FAILED,
  };
};

export const getRegistrationType = (id) => {
  return {
    type: GET_REGISTRATION_TYPE,
    id,
  };
};

export const getRegistrationTypeSuccess = (data) => {
  return {
    type: GET_REGISTRATION_TYPE_SUCCESS,
    data,
  };
};

export const getRegistrationTypeFailed = (id) => {
  return {
    type: GET_REGISTRATION_TYPE_FAILED,
    id,
  };
};

export const saveRegistrationType = (object) => {
  return {
    type: SAVE_REGISTRATION_TYPE,
    object,
  };
};

export const saveRegistrationTypeSuccess = (data) => {
  return {
    type: SAVE_REGISTRATION_TYPE_SUCCESS,
    data,
  };
};

export const saveRegistrationTypeFailed = (data) => {
  return {
    type: SAVE_REGISTRATION_TYPE_FAILED,
    data,
  };
};

export const deleteRegistrationType = (object, page = 0) => {
  return {
    type: DELETE_REGISTRATION_TYPE,
    object,
    page,
  };
};

export const deleteRegistrationTypeSuccess = (object) => {
  return {
    type: DELETE_REGISTRATION_TYPE_SUCCESS,
    object,
  };
};

export const deleteRegistrationTypeFailed = (data) => {
  return {
    type: DELETE_REGISTRATION_TYPE_FAILED,
    data,
  };
};

export const newRegistrationType = () => {
  return {
    type: NEW_REGISTRATION_TYPE,
  };
};

export const findRegistrationTypesByName = (name = '') => {
  return {
    type: FIND_REGISTRATION_TYPES_BY_NAME,
    name,
  };
};
