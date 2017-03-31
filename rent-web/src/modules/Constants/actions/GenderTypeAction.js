export const GET_GENDER_TYPES = 'GET_GENDER_TYPES';
export const GET_GENDER_TYPES_SUCCESS = 'GET_GENDER_TYPES_SUCCESS';
export const GET_GENDER_TYPES_FAILED = 'GET_GENDER_TYPES_FAILED';
export const GET_GENDER_TYPE = 'GET_GENDER_TYPE';
export const GET_GENDER_TYPE_SUCCESS = 'GET_GENDER_TYPE_SUCCESS';
export const GET_GENDER_TYPE_FAILED = 'GET_GENDER_TYPE_FAILED';
export const SAVE_GENDER_TYPE = 'SAVE_GENDER_TYPE';
export const SAVE_GENDER_TYPE_SUCCESS = 'SAVE_GENDER_TYPE_SUCCESS';
export const SAVE_GENDER_TYPE_FAILED = 'SAVE_GENDER_TYPE_FAILED';
export const DELETE_GENDER_TYPE = 'DELETE_GENDER_TYPE';
export const DELETE_GENDER_TYPE_SUCCESS = 'DELETE_GENDER_TYPE_SUCCESS';
export const DELETE_GENDER_TYPE_FAILED = 'DELETE_GENDER_TYPE_FAILED';
export const NEW_GENDER_TYPE = 'NEW_GENDER_TYPE';
export const FIND_GENDER_TYPES_BY_NAME = 'FIND_GENDER_TYPES_BY_NAME';

export const getGenderTypes = (page = 0) => {
  return {
    type: GET_GENDER_TYPES,
    page,
  };
};

export const getGenderTypesSuccess = (data) => {
  return {
    type: GET_GENDER_TYPES_SUCCESS,
    data,
  };
};

export const getGenderTypesFailed = () => {
  return {
    type: GET_GENDER_TYPES_FAILED,
  };
};

export const getGenderType = (id) => {
  return {
    type: GET_GENDER_TYPE,
    id,
  };
};

export const getGenderTypeSuccess = (data) => {
  return {
    type: GET_GENDER_TYPE_SUCCESS,
    data,
  };
};

export const getGenderTypeFailed = (id) => {
  return {
    type: GET_GENDER_TYPE_FAILED,
    id,
  };
};

export const saveGenderType = (object) => {
  return {
    type: SAVE_GENDER_TYPE,
    object,
  };
};

export const saveGenderTypeSuccess = (data) => {
  return {
    type: SAVE_GENDER_TYPE_SUCCESS,
    data,
  };
};

export const saveGenderTypeFailed = (data) => {
  return {
    type: SAVE_GENDER_TYPE_FAILED,
    data,
  };
};

export const deleteGenderType = (object, page = 0) => {
  return {
    type: DELETE_GENDER_TYPE,
    object,
    page,
  };
};

export const deleteGenderTypeSuccess = (object) => {
  return {
    type: DELETE_GENDER_TYPE_SUCCESS,
    object,
  };
};

export const deleteGenderTypeFailed = (data) => {
  return {
    type: DELETE_GENDER_TYPE_FAILED,
    data,
  };
};

export const newGenderType = () => {
  return {
    type: NEW_GENDER_TYPE,
  };
};

export const findGenderTypesByName = (name = '') => {
  return {
    type: FIND_GENDER_TYPES_BY_NAME,
    name,
  };
};
