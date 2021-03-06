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
export const CLEAR_LOCAL_DATA_CITIZENS = 'CLEAR_LOCAL_DATA_CITIZENS';

// citizen documents
export const ADD_NEW_DOCUMENT_TO_CITIZEN = 'ADD_NEW_DOCUMENT_TO_CITIZEN';
export const EDIT_DOCUMENT_IN_CITIZEN = 'EDIT_DOCUMENT_IN_CITIZEN';
export const REMOVE_DOCUMENT_FROM_CITIZEN = 'REMOVE_DOCUMENT_FROM_CITIZEN';

// citizen documents attachments
export const ADD_NEW_ATTACHMENT_TO_CITIZEN_DOCUMENT = 'ADD_NEW_ATTACHMENT_TO_CITIZEN_DOCUMENT';
export const EDIT_ATTACHMENT_IN_CITIZEN_DOCUMENT = 'EDIT_ATTACHMENT_IN_CITIZEN_DOCUMENT';
export const REMOVE_ATTACHMENT_FROM_CITIZEN_DOCUMENT = 'REMOVE_ATTACHMENT_FROM_CITIZEN_DOCUMENT';

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

export const deleteCitizen = (object, firstName = '', lastName = '', fatherName = '', documentSeries = '', documentNumber = '', page = 0) => {
  return {
    type: DELETE_CITIZEN,
    object,
    firstName,
    lastName,
    fatherName,
    documentSeries,
    documentNumber,
    page,
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

export const findCitizens = (firstName = '', lastName = '', fatherName = '', documentSeries = '', documentNumber = '', page = 0, size) => {
  return {
    type: FIND_CITIZENS,
    firstName,
    lastName,
    fatherName,
    documentSeries,
    documentNumber,
    page,
    size,
  };
};

export const clearLocalDataCitizens = () => {
  return {
    type: CLEAR_LOCAL_DATA_CITIZENS,
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

// citizen documents attachments
export const addNewAttachmentToCitizenDocument = (document, attachment) => {
  return {
    type: ADD_NEW_ATTACHMENT_TO_CITIZEN_DOCUMENT,
    document,
    attachment,
  };
};
export const editAttachmentInCitizenDocument = (document, attachment) => {
  return {
    type: EDIT_ATTACHMENT_IN_CITIZEN_DOCUMENT,
    document,
    attachment,
  };
};
export const removeAttachmentFromCitizenDocument = (document, attachment) => {
  return {
    type: REMOVE_ATTACHMENT_FROM_CITIZEN_DOCUMENT,
    document,
    attachment,
  };
};
