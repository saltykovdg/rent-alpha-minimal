export const GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS = 'GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS';
export const GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS_SUCCESS = 'GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS_SUCCESS';
export const GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS_FAILED = 'GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS_FAILED';
export const GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT = 'GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT';
export const GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS = 'GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS';
export const GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED = 'GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED';
export const SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT = 'SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT';
export const SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS = 'SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS';
export const SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED = 'SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED';
export const DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT = 'DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT';
export const DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS = 'DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS';
export const DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED = 'DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED';
export const NEW_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT = 'NEW_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT';

export const getAccountOwnerDocumentAttachments = (page = 0) => {
  return {
    type: GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS,
    page,
  };
};

export const getAccountOwnerDocumentAttachmentsSuccess = (data) => {
  return {
    type: GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS_SUCCESS,
    data,
  };
};

export const getAccountOwnerDocumentAttachmentsFailed = () => {
  return {
    type: GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS_FAILED,
  };
};

export const getAccountOwnerDocumentAttachment = (id) => {
  return {
    type: GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT,
    id,
  };
};

export const getAccountOwnerDocumentAttachmentSuccess = (data) => {
  return {
    type: GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS,
    data,
  };
};

export const getAccountOwnerDocumentAttachmentFailed = (id) => {
  return {
    type: GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED,
    id,
  };
};

export const saveAccountOwnerDocumentAttachment = (object, attachment) => {
  return {
    type: SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT,
    object,
    attachment,
  };
};

export const saveAccountOwnerDocumentAttachmentSuccess = (data) => {
  return {
    type: SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS,
    data,
  };
};

export const saveAccountOwnerDocumentAttachmentFailed = (data) => {
  return {
    type: SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED,
    data,
  };
};

export const deleteAccountOwnerDocumentAttachment = (object) => {
  return {
    type: DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT,
    object,
  };
};

export const deleteAccountOwnerDocumentAttachmentSuccess = (object) => {
  return {
    type: DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS,
    object,
  };
};

export const deleteAccountOwnerDocumentAttachmentFailed = (data) => {
  return {
    type: DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED,
    data,
  };
};

export const newAccountOwnerDocumentAttachment = () => {
  return {
    type: NEW_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT,
  };
};
