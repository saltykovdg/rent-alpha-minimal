export const GET_SERVICE_TYPES = 'GET_SERVICE_TYPES';
export const GET_SERVICE_TYPES_SUCCESS = 'GET_SERVICE_TYPES_SUCCESS';
export const GET_SERVICE_TYPES_FAILED = 'GET_SERVICE_TYPES_FAILED';
export const GET_SERVICE_TYPE = 'GET_SERVICE_TYPE';
export const GET_SERVICE_TYPE_SUCCESS = 'GET_SERVICE_TYPE_SUCCESS';
export const GET_SERVICE_TYPE_FAILED = 'GET_SERVICE_TYPE_FAILED';
export const SAVE_SERVICE_TYPE = 'SAVE_SERVICE_TYPE';
export const SAVE_SERVICE_TYPE_SUCCESS = 'SAVE_SERVICE_TYPE_SUCCESS';
export const SAVE_SERVICE_TYPE_FAILED = 'SAVE_SERVICE_TYPE_FAILED';
export const DELETE_SERVICE_TYPE = 'DELETE_SERVICE_TYPE';
export const DELETE_SERVICE_TYPE_SUCCESS = 'DELETE_SERVICE_TYPE_SUCCESS';
export const DELETE_SERVICE_TYPE_FAILED = 'DELETE_SERVICE_TYPE_FAILED';
export const NEW_SERVICE_TYPE = 'NEW_SERVICE_TYPE';
export const FIND_SERVICE_TYPES_BY_NAME = 'FIND_SERVICE_TYPES_BY_NAME';

export const getServiceTypes = (page = 0) => {
  return {
    type: GET_SERVICE_TYPES,
    page,
  };
};

export const getServiceTypesSuccess = (data) => {
  return {
    type: GET_SERVICE_TYPES_SUCCESS,
    data,
  };
};

export const getServiceTypesFailed = () => {
  return {
    type: GET_SERVICE_TYPES_FAILED,
  };
};

export const getServiceType = (id) => {
  return {
    type: GET_SERVICE_TYPE,
    id,
  };
};

export const getServiceTypeSuccess = (data) => {
  return {
    type: GET_SERVICE_TYPE_SUCCESS,
    data,
  };
};

export const getServiceTypeFailed = (id) => {
  return {
    type: GET_SERVICE_TYPE_FAILED,
    id,
  };
};

export const saveServiceType = (object) => {
  return {
    type: SAVE_SERVICE_TYPE,
    object,
  };
};

export const saveServiceTypeSuccess = (data) => {
  return {
    type: SAVE_SERVICE_TYPE_SUCCESS,
    data,
  };
};

export const saveServiceTypeFailed = (data) => {
  return {
    type: SAVE_SERVICE_TYPE_FAILED,
    data,
  };
};

export const deleteServiceType = (object, page = 0) => {
  return {
    type: DELETE_SERVICE_TYPE,
    object,
    page,
  };
};

export const deleteServiceTypeSuccess = (object) => {
  return {
    type: DELETE_SERVICE_TYPE_SUCCESS,
    object,
  };
};

export const deleteServiceTypeFailed = (data) => {
  return {
    type: DELETE_SERVICE_TYPE_FAILED,
    data,
  };
};

export const newServiceType = () => {
  return {
    type: NEW_SERVICE_TYPE,
  };
};

export const findServiceTypesByName = (name = '') => {
  return {
    type: FIND_SERVICE_TYPES_BY_NAME,
    name,
  };
};
