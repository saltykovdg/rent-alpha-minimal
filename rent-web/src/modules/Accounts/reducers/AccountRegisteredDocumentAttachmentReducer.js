import * as AccountRegisteredDocumentAttachmentAction from './../actions/AccountRegisteredDocumentAttachmentAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const accountRegisteredDocumentAttachmentReducer = (state, action) => {
  switch (action.type) {
    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT:
    case AccountRegisteredDocumentAttachmentAction.SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT: {
      return prepareEdit(state.accountRegisteredDocumentAttachment.edit.data, true, false, false, false);
    }
    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS:
    case AccountRegisteredDocumentAttachmentAction.DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT: {
      return prepareList(state.accountRegisteredDocumentAttachment.list.data, emptyEditData, true, false, false, false);
    }

    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AccountRegisteredDocumentAttachmentAction.SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AccountRegisteredDocumentAttachmentAction.DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareList(state.accountRegisteredDocumentAttachment.list.data, emptyEditData, false, false, false, true);
    }

    case AccountRegisteredDocumentAttachmentAction.SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEdit(state.accountRegisteredDocumentAttachment.edit.data, false, true, false, false);
    }
    case AccountRegisteredDocumentAttachmentAction.DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareList(state.accountRegisteredDocumentAttachment.list.data, emptyEditData, false, true, false, false);
    }

    case AccountRegisteredDocumentAttachmentAction.NEW_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.accountRegisteredDocumentAttachment.list, emptyEditData);
  }
};

/* Selectors */
export const getAccountRegisteredDocumentAttachmentEditData = state => state.accounts.accountRegisteredDocumentAttachment.edit.data;
export const getAccountRegisteredDocumentAttachmentListData = state => state.accounts.accountRegisteredDocumentAttachment.list.data;
export const getAccountRegisteredDocumentAttachmentIsLoading = state => state.accounts.accountRegisteredDocumentAttachment.list.isLoading || state.accounts.accountRegisteredDocumentAttachment.edit.isLoading;
export const getAccountRegisteredDocumentAttachmentIsRequestError = state => state.accounts.accountRegisteredDocumentAttachment.list.isRequestError || state.accounts.accountRegisteredDocumentAttachment.edit.isRequestError;
export const getAccountRegisteredDocumentAttachmentIsSaved = state => state.accounts.accountRegisteredDocumentAttachment.isSaved;
export const getAccountRegisteredDocumentAttachmentIsDeleted = state => state.accounts.accountRegisteredDocumentAttachment.isDeleted;
