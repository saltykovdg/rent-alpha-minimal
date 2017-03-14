export const GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS = 'GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS';
export const GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS_SUCCESS = 'GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS_SUCCESS';
export const GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS_FAILED = 'GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS_FAILED';
export const GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT = 'GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT';
export const GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS = 'GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS';
export const GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED = 'GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED';
export const SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT = 'SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT';
export const SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS = 'SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS';
export const SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED = 'SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED';
export const DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT = 'DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT';
export const DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS = 'DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS';
export const DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED = 'DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED';
export const NEW_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT = 'NEW_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT';

export const getAccountRegisteredDocumentAttachments = (page = 0) => {
  return {
    type: GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS,
    page,
  };
};

export const getAccountRegisteredDocumentAttachmentsSuccess = (data) => {
  return {
    type: GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS_SUCCESS,
    data,
  };
};

export const getAccountRegisteredDocumentAttachmentsFailed = () => {
  return {
    type: GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS_FAILED,
  };
};

export const getAccountRegisteredDocumentAttachment = (id) => {
  return {
    type: GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT,
    id,
  };
};

export const getAccountRegisteredDocumentAttachmentSuccess = (data) => {
  return {
    type: GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS,
    data,
  };
};

export const getAccountRegisteredDocumentAttachmentFailed = (id) => {
  return {
    type: GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED,
    id,
  };
};

export const saveAccountRegisteredDocumentAttachment = (object, attachment) => {
  return {
    type: SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT,
    object,
    attachment,
  };
};

export const saveAccountRegisteredDocumentAttachmentSuccess = (data) => {
  return {
    type: SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS,
    data,
  };
};

export const saveAccountRegisteredDocumentAttachmentFailed = (data) => {
  return {
    type: SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED,
    data,
  };
};

export const deleteAccountRegisteredDocumentAttachment = (object) => {
  return {
    type: DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT,
    object,
  };
};

export const deleteAccountRegisteredDocumentAttachmentSuccess = (object) => {
  return {
    type: DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS,
    object,
  };
};

export const deleteAccountRegisteredDocumentAttachmentFailed = (data) => {
  return {
    type: DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED,
    data,
  };
};

export const newAccountRegisteredDocumentAttachment = () => {
  return {
    type: NEW_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT,
  };
};
