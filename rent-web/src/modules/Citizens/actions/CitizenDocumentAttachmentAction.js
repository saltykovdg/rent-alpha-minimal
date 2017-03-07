export const GET_CITIZEN_DOCUMENT_ATTACHMENTS = 'GET_CITIZEN_DOCUMENT_ATTACHMENTS';
export const GET_CITIZEN_DOCUMENT_ATTACHMENTS_SUCCESS = 'GET_CITIZEN_DOCUMENT_ATTACHMENTS_SUCCESS';
export const GET_CITIZEN_DOCUMENT_ATTACHMENTS_FAILED = 'GET_CITIZEN_DOCUMENT_ATTACHMENTS_FAILED';
export const GET_CITIZEN_DOCUMENT_ATTACHMENT = 'GET_CITIZEN_DOCUMENT_ATTACHMENT';
export const GET_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS = 'GET_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS';
export const GET_CITIZEN_DOCUMENT_ATTACHMENT_FAILED = 'GET_CITIZEN_DOCUMENT_ATTACHMENT_FAILED';
export const SAVE_CITIZEN_DOCUMENT_ATTACHMENT = 'SAVE_CITIZEN_DOCUMENT_ATTACHMENT';
export const SAVE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS = 'SAVE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS';
export const SAVE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED = 'SAVE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED';
export const DELETE_CITIZEN_DOCUMENT_ATTACHMENT = 'DELETE_CITIZEN_DOCUMENT_ATTACHMENT';
export const DELETE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS = 'DELETE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS';
export const DELETE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED = 'DELETE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED';
export const NEW_CITIZEN_DOCUMENT_ATTACHMENT = 'NEW_CITIZEN_DOCUMENT_ATTACHMENT';

export const getCitizenDocumentAttachments = (page = 0) => {
  return {
    type: GET_CITIZEN_DOCUMENT_ATTACHMENTS,
    page,
  };
};

export const getCitizenDocumentAttachmentsSuccess = (data) => {
  return {
    type: GET_CITIZEN_DOCUMENT_ATTACHMENTS_SUCCESS,
    data,
  };
};

export const getCitizenDocumentAttachmentsFailed = () => {
  return {
    type: GET_CITIZEN_DOCUMENT_ATTACHMENTS_FAILED,
  };
};

export const getCitizenDocumentAttachment = (id) => {
  return {
    type: GET_CITIZEN_DOCUMENT_ATTACHMENT,
    id,
  };
};

export const getCitizenDocumentAttachmentSuccess = (data) => {
  return {
    type: GET_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS,
    data,
  };
};

export const getCitizenDocumentAttachmentFailed = (id) => {
  return {
    type: GET_CITIZEN_DOCUMENT_ATTACHMENT_FAILED,
    id,
  };
};

export const saveCitizenDocumentAttachment = (object, attachment) => {
  return {
    type: SAVE_CITIZEN_DOCUMENT_ATTACHMENT,
    object,
    attachment,
  };
};

export const saveCitizenDocumentAttachmentSuccess = (data) => {
  return {
    type: SAVE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS,
    data,
  };
};

export const saveCitizenDocumentAttachmentFailed = (data) => {
  return {
    type: SAVE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED,
    data,
  };
};

export const deleteCitizenDocumentAttachment = (object) => {
  return {
    type: DELETE_CITIZEN_DOCUMENT_ATTACHMENT,
    object,
  };
};

export const deleteCitizenDocumentAttachmentSuccess = (object) => {
  return {
    type: DELETE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS,
    object,
  };
};

export const deleteCitizenDocumentAttachmentFailed = (data) => {
  return {
    type: DELETE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED,
    data,
  };
};

export const newCitizenDocumentAttachment = () => {
  return {
    type: NEW_CITIZEN_DOCUMENT_ATTACHMENT,
  };
};
