export const GET_CITIZENS = 'GET_CITIZENS';
export const GET_CITIZENS_SUCCESS = 'GET_CITIZENS_SUCCESS';
export const GET_CITIZENS_FAILED = 'GET_CITIZENS_FAILED';
export const GET_CITIZEN = 'GET_CITIZEN';
export const GET_CITIZEN_SUCCESS = 'GET_CITIZEN_SUCCESS';
export const GET_CITIZEN_FAILED = 'GET_CITIZEN_FAILED';
export const SAVE_CITIZEN = 'SAVE_CITIZEN';
export const SAVE_CITIZEN_SUCCESS = 'SAVE_CITIZEN_SUCCESS';
export const SAVE_CITIZEN_FAILED = 'SAVE_CITIZEN_FAILED';
export const DELETE_CITIZEN = 'DELETE_CITIZEN';
export const DELETE_CITIZEN_SUCCESS = 'DELETE_CITIZEN_SUCCESS';
export const DELETE_CITIZEN_FAILED = 'DELETE_CITIZEN_FAILED';
export const NEW_CITIZEN = 'NEW_CITIZEN';
export const FIND_CITIZENS = 'FIND_CITIZENS';

// citizen documents
export const ADD_NEW_DOCUMENT_TO_CITIZEN = 'ADD_NEW_DOCUMENT_TO_CITIZEN';
export const EDIT_DOCUMENT_IN_CITIZEN = 'EDIT_DOCUMENT_IN_CITIZEN';
export const REMOVE_DOCUMENT_FROM_CITIZEN = 'REMOVE_DOCUMENT_FROM_CITIZEN';

export const getCitizens = (page = 0) => {
  return {
    type: GET_CITIZENS,
    page,
  };
};

export const getCitizensSuccess = (data) => {
  return {
    type: GET_CITIZENS_SUCCESS,
    data,
  };
};

export const getCitizensFailed = () => {
  return {
    type: GET_CITIZENS_FAILED,
  };
};

export const getCitizen = (id) => {
  return {
    type: GET_CITIZEN,
    id,
  };
};

export const getCitizenSuccess = (data) => {
  return {
    type: GET_CITIZEN_SUCCESS,
    data,
  };
};

export const getCitizenFailed = (id) => {
  return {
    type: GET_CITIZEN_FAILED,
    id,
  };
};

export const saveCitizen = (object) => {
  return {
    type: SAVE_CITIZEN,
    object,
  };
};

export const saveCitizenSuccess = (data) => {
  return {
    type: SAVE_CITIZEN_SUCCESS,
    data,
  };
};

export const saveCitizenFailed = (data) => {
  return {
    type: SAVE_CITIZEN_FAILED,
    data,
  };
};

export const deleteCitizen = (object) => {
  return {
    type: DELETE_CITIZEN,
    object,
  };
};

export const deleteCitizenSuccess = (object) => {
  return {
    type: DELETE_CITIZEN_SUCCESS,
    object,
  };
};

export const deleteCitizenFailed = (data) => {
  return {
    type: DELETE_CITIZEN_FAILED,
    data,
  };
};

export const newCitizen = () => {
  return {
    type: NEW_CITIZEN,
  };
};

export const findCitizens = (firstName = '', lastName = '', fatherName = '', documentSeries = '', documentNumber = '', page = 0) => {
  return {
    type: FIND_CITIZENS,
    firstName,
    lastName,
    fatherName,
    documentSeries,
    documentNumber,
    page,
  };
};

// citizen documents
export const addNewDocumentToCitizen = (document) => {
  return {
    type: ADD_NEW_DOCUMENT_TO_CITIZEN,
    document,
  };
};
export const editDocumentInCitizen = (document) => {
  return {
    type: EDIT_DOCUMENT_IN_CITIZEN,
    document,
  };
};
export const removeDocumentFromCitizen = (document) => {
  return {
    type: REMOVE_DOCUMENT_FROM_CITIZEN,
    document,
  };
};
