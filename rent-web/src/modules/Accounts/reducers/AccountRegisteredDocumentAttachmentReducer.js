import * as AccountRegisteredDocumentAttachmentAction from './../actions/AccountRegisteredDocumentAttachmentAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const accountRegisteredDocumentAttachmentReducer = (state, action) => {
  switch (action.type) {
    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT: {
      return prepareEditLoading(state.accountRegisteredDocumentAttachment.list.data, emptyEditData);
    }
    case AccountRegisteredDocumentAttachmentAction.SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT: {
      return prepareEditLoading(state.accountRegisteredDocumentAttachment.list.data, state.accountRegisteredDocumentAttachment.edit.data);
    }
    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS:
    case AccountRegisteredDocumentAttachmentAction.DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT: {
      return prepareListLoading(state.accountRegisteredDocumentAttachment.list.data, emptyEditData);
    }

    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareSuccess(state.accountRegisteredDocumentAttachment.list.data, action.data);
    }
    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEditFailed(state.accountRegisteredDocumentAttachment.list.data, emptyEditData);
    }
    case AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS_FAILED: {
      return prepareListFailed(state.accountRegisteredDocumentAttachment.list.data, emptyEditData);
    }

    case AccountRegisteredDocumentAttachmentAction.SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareSaveSuccess(state.accountRegisteredDocumentAttachment.list.data, emptyEditData);
    }
    case AccountRegisteredDocumentAttachmentAction.DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareDeleteSuccess(state.accountRegisteredDocumentAttachment.list.data, emptyEditData);
    }

    case AccountRegisteredDocumentAttachmentAction.SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEditFailed(state.accountRegisteredDocumentAttachment.list.data, state.accountRegisteredDocumentAttachment.edit.data);
    }
    case AccountRegisteredDocumentAttachmentAction.DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareListFailed(state.accountRegisteredDocumentAttachment.list.data, emptyEditData);
    }

    case AccountRegisteredDocumentAttachmentAction.NEW_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT: {
      return prepareSuccess(state.accountRegisteredDocumentAttachment.list.data, emptyEditData);
    }

    default:
      return state.accountRegisteredDocumentAttachment;
  }
};

/* Selectors */
export const getAccountRegisteredDocumentAttachmentEditData = state => state.accounts.accountRegisteredDocumentAttachment.edit.data;
export const getAccountRegisteredDocumentAttachmentListData = state => state.accounts.accountRegisteredDocumentAttachment.list.data;
export const getAccountRegisteredDocumentAttachmentIsLoading = state => state.accounts.accountRegisteredDocumentAttachment.list.isLoading ||
                                                                        state.accounts.accountRegisteredDocumentAttachment.edit.isLoading;
export const getAccountRegisteredDocumentAttachmentIsRequestError = state => state.accounts.accountRegisteredDocumentAttachment.list.isRequestError ||
                                                                             state.accounts.accountRegisteredDocumentAttachment.edit.isRequestError;
export const getAccountRegisteredDocumentAttachmentIsSaved = state => state.accounts.accountRegisteredDocumentAttachment.isSaved;
export const getAccountRegisteredDocumentAttachmentIsDeleted = state => state.accounts.accountRegisteredDocumentAttachment.isDeleted;
