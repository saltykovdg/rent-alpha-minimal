export const GET_SYSTEM_PROPERTIES = 'GET_SYSTEM_PROPERTIES';
export const GET_SYSTEM_PROPERTIES_SUCCESS = 'GET_SYSTEM_PROPERTIES_SUCCESS';
export const GET_SYSTEM_PROPERTIES_FAILED = 'GET_SYSTEM_PROPERTIES_FAILED';
export const GET_SYSTEM_PROPERTY = 'GET_SYSTEM_PROPERTY';
export const GET_SYSTEM_PROPERTY_SUCCESS = 'GET_SYSTEM_PROPERTY_SUCCESS';
export const GET_SYSTEM_PROPERTY_FAILED = 'GET_SYSTEM_PROPERTY_FAILED';
export const SAVE_SYSTEM_PROPERTY = 'SAVE_SYSTEM_PROPERTY';
export const SAVE_SYSTEM_PROPERTY_SUCCESS = 'SAVE_SYSTEM_PROPERTY_SUCCESS';
export const SAVE_SYSTEM_PROPERTY_FAILED = 'SAVE_SYSTEM_PROPERTY_FAILED';
export const DELETE_SYSTEM_PROPERTY = 'DELETE_SYSTEM_PROPERTY';
export const DELETE_SYSTEM_PROPERTY_SUCCESS = 'DELETE_SYSTEM_PROPERTY_SUCCESS';
export const DELETE_SYSTEM_PROPERTY_FAILED = 'DELETE_SYSTEM_PROPERTY_FAILED';
export const NEW_SYSTEM_PROPERTY = 'NEW_SYSTEM_PROPERTY';
export const FIND_SYSTEM_PROPERTIES_BY_NAME = 'FIND_SYSTEM_PROPERTIES_BY_NAME';

export const getSystemProperties = (page = 0) => {
  return {
    type: GET_SYSTEM_PROPERTIES,
    page,
  };
};

export const getSystemPropertiesSuccess = (data) => {
  return {
    type: GET_SYSTEM_PROPERTIES_SUCCESS,
    data,
  };
};

export const getSystemPropertiesFailed = () => {
  return {
    type: GET_SYSTEM_PROPERTIES_FAILED,
  };
};

export const getSystemProperty = (id) => {
  return {
    type: GET_SYSTEM_PROPERTY,
    id,
  };
};

export const getSystemPropertySuccess = (data) => {
  return {
    type: GET_SYSTEM_PROPERTY_SUCCESS,
    data,
  };
};

export const getSystemPropertyFailed = (id) => {
  return {
    type: GET_SYSTEM_PROPERTY_FAILED,
    id,
  };
};

export const saveSystemProperty = (object) => {
  return {
    type: SAVE_SYSTEM_PROPERTY,
    object,
  };
};

export const saveSystemPropertySuccess = (data) => {
  return {
    type: SAVE_SYSTEM_PROPERTY_SUCCESS,
    data,
  };
};

export const saveSystemPropertyFailed = (data) => {
  return {
    type: SAVE_SYSTEM_PROPERTY_FAILED,
    data,
  };
};

export const deleteSystemProperty = (object, page = 0) => {
  return {
    type: DELETE_SYSTEM_PROPERTY,
    object,
    page,
  };
};

export const deleteSystemPropertySuccess = (object) => {
  return {
    type: DELETE_SYSTEM_PROPERTY_SUCCESS,
    object,
  };
};

export const deleteSystemPropertyFailed = (data) => {
  return {
    type: DELETE_SYSTEM_PROPERTY_FAILED,
    data,
  };
};

export const newSystemProperty = () => {
  return {
    type: NEW_SYSTEM_PROPERTY,
  };
};

export const findSystemPropertiesByName = (name = '', useDelay = false) => {
  return {
    type: FIND_SYSTEM_PROPERTIES_BY_NAME,
    name,
    useDelay,
  };
};
