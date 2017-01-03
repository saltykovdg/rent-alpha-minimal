export const GET_DOCUMENT_TYPES = 'GET_DOCUMENT_TYPES';
export const GET_DOCUMENT_TYPES_SUCCESS = 'GET_DOCUMENT_TYPES_SUCCESS';
export const GET_DOCUMENT_TYPES_FAILED = 'GET_DOCUMENT_TYPES_FAILED';
export const GET_DOCUMENT_TYPE = 'GET_DOCUMENT_TYPE';
export const GET_DOCUMENT_TYPE_SUCCESS = 'GET_DOCUMENT_TYPE_SUCCESS';
export const GET_DOCUMENT_TYPE_FAILED = 'GET_DOCUMENT_TYPE_FAILED';
export const SAVE_DOCUMENT_TYPE = 'SAVE_DOCUMENT_TYPE';
export const SAVE_DOCUMENT_TYPE_SUCCESS = 'SAVE_DOCUMENT_TYPE_SUCCESS';
export const SAVE_DOCUMENT_TYPE_FAILED = 'SAVE_DOCUMENT_TYPE_FAILED';
export const DELETE_DOCUMENT_TYPE = 'DELETE_DOCUMENT_TYPE';
export const DELETE_DOCUMENT_TYPE_SUCCESS = 'DELETE_DOCUMENT_TYPE_SUCCESS';
export const DELETE_DOCUMENT_TYPE_FAILED = 'DELETE_DOCUMENT_TYPE_FAILED';
export const NEW_DOCUMENT_TYPE = 'NEW_DOCUMENT_TYPE';
export const FIND_DOCUMENT_TYPES_BY_NAME = 'FIND_DOCUMENT_TYPES_BY_NAME';

export const getDocumentTypes = (page = 0) => {
  return {
    type: GET_DOCUMENT_TYPES,
    page,
  };
};

export const getDocumentTypesSuccess = (data) => {
  return {
    type: GET_DOCUMENT_TYPES_SUCCESS,
    data,
  };
};

export const getDocumentTypesFailed = () => {
  return {
    type: GET_DOCUMENT_TYPES_FAILED,
  };
};

export const getDocumentType = (id) => {
  return {
    type: GET_DOCUMENT_TYPE,
    id,
  };
};

export const getDocumentTypeSuccess = (data) => {
  return {
    type: GET_DOCUMENT_TYPE_SUCCESS,
    data,
  };
};

export const getDocumentTypeFailed = (id) => {
  return {
    type: GET_DOCUMENT_TYPE_FAILED,
    id,
  };
};

export const saveDocumentType = (object) => {
  return {
    type: SAVE_DOCUMENT_TYPE,
    object,
  };
};

export const saveDocumentTypeSuccess = (data) => {
  return {
    type: SAVE_DOCUMENT_TYPE_SUCCESS,
    data,
  };
};

export const saveDocumentTypeFailed = (data) => {
  return {
    type: SAVE_DOCUMENT_TYPE_FAILED,
    data,
  };
};

export const deleteDocumentType = (object) => {
  return {
    type: DELETE_DOCUMENT_TYPE,
    object,
  };
};

export const deleteDocumentTypeSuccess = (object) => {
  return {
    type: DELETE_DOCUMENT_TYPE_SUCCESS,
    object,
  };
};

export const deleteDocumentTypeFailed = (data) => {
  return {
    type: DELETE_DOCUMENT_TYPE_FAILED,
    data,
  };
};

export const newDocumentType = () => {
  return {
    type: NEW_DOCUMENT_TYPE,
  };
};

export const findDocumentTypesByName = (name = '') => {
  return {
    type: FIND_DOCUMENT_TYPES_BY_NAME,
    name,
  };
};
