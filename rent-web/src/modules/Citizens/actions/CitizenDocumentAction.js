export const GET_CITIZEN_DOCUMENTS = 'GET_CITIZEN_DOCUMENTS';
export const GET_CITIZEN_DOCUMENTS_SUCCESS = 'GET_CITIZEN_DOCUMENTS_SUCCESS';
export const GET_CITIZEN_DOCUMENTS_FAILED = 'GET_CITIZEN_DOCUMENTS_FAILED';
export const GET_CITIZEN_DOCUMENT = 'GET_CITIZEN_DOCUMENT';
export const GET_CITIZEN_DOCUMENT_SUCCESS = 'GET_CITIZEN_DOCUMENT_SUCCESS';
export const GET_CITIZEN_DOCUMENT_FAILED = 'GET_CITIZEN_DOCUMENT_FAILED';
export const SAVE_CITIZEN_DOCUMENT = 'SAVE_CITIZEN_DOCUMENT';
export const SAVE_CITIZEN_DOCUMENT_SUCCESS = 'SAVE_CITIZEN_DOCUMENT_SUCCESS';
export const SAVE_CITIZEN_DOCUMENT_FAILED = 'SAVE_CITIZEN_DOCUMENT_FAILED';
export const DELETE_CITIZEN_DOCUMENT = 'DELETE_CITIZEN_DOCUMENT';
export const DELETE_CITIZEN_DOCUMENT_SUCCESS = 'DELETE_CITIZEN_DOCUMENT_SUCCESS';
export const DELETE_CITIZEN_DOCUMENT_FAILED = 'DELETE_CITIZEN_DOCUMENT_FAILED';
export const NEW_CITIZEN_DOCUMENT = 'NEW_CITIZEN_DOCUMENT';

export const getCitizenDocuments = (page = 0) => {
  return {
    type: GET_CITIZEN_DOCUMENTS,
    page,
  };
};

export const getCitizenDocumentsSuccess = (data) => {
  return {
    type: GET_CITIZEN_DOCUMENTS_SUCCESS,
    data,
  };
};

export const getCitizenDocumentsFailed = () => {
  return {
    type: GET_CITIZEN_DOCUMENTS_FAILED,
  };
};

export const getCitizenDocument = (id) => {
  return {
    type: GET_CITIZEN_DOCUMENT,
    id,
  };
};

export const getCitizenDocumentSuccess = (data) => {
  return {
    type: GET_CITIZEN_DOCUMENT_SUCCESS,
    data,
  };
};

export const getCitizenDocumentFailed = (id) => {
  return {
    type: GET_CITIZEN_DOCUMENT_FAILED,
    id,
  };
};

export const saveCitizenDocument = (object) => {
  return {
    type: SAVE_CITIZEN_DOCUMENT,
    object,
  };
};

export const saveCitizenDocumentSuccess = (data) => {
  return {
    type: SAVE_CITIZEN_DOCUMENT_SUCCESS,
    data,
  };
};

export const saveCitizenDocumentFailed = (data) => {
  return {
    type: SAVE_CITIZEN_DOCUMENT_FAILED,
    data,
  };
};

export const deleteCitizenDocument = (object) => {
  return {
    type: DELETE_CITIZEN_DOCUMENT,
    object,
  };
};

export const deleteCitizenDocumentSuccess = (object) => {
  return {
    type: DELETE_CITIZEN_DOCUMENT_SUCCESS,
    object,
  };
};

export const deleteCitizenDocumentFailed = (data) => {
  return {
    type: DELETE_CITIZEN_DOCUMENT_FAILED,
    data,
  };
};

export const newCitizenDocument = () => {
  return {
    type: NEW_CITIZEN_DOCUMENT,
  };
};
