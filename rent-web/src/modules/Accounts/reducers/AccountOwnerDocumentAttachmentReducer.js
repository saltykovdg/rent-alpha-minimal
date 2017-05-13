import * as AccountOwnerDocumentAttachmentAction from './../actions/AccountOwnerDocumentAttachmentAction';
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

export const accountOwnerDocumentAttachmentReducer = (state, action) => {
  switch (action.type) {
    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT: {
      return prepareEditLoading(state.accountOwnerDocumentAttachment.list.data, emptyEditData);
    }
    case AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT: {
      return prepareEditLoading(state.accountOwnerDocumentAttachment.list.data, state.accountOwnerDocumentAttachment.edit.data);
    }
    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS:
    case AccountOwnerDocumentAttachmentAction.DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT: {
      return prepareListLoading(state.accountOwnerDocumentAttachment.list.data, emptyEditData);
    }

    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareSuccess(state.accountOwnerDocumentAttachment.list.data, action.data);
    }
    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEditFailed(state.accountOwnerDocumentAttachment.list.data, emptyEditData);
    }
    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS_FAILED: {
      return prepareListFailed(state.accountOwnerDocumentAttachment.list.data, emptyEditData);
    }

    case AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareSaveSuccess(state.accountOwnerDocumentAttachment.list.data, emptyEditData);
    }
    case AccountOwnerDocumentAttachmentAction.DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareDeleteSuccess(state.accountOwnerDocumentAttachment.list.data, emptyEditData);
    }

    case AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEditFailed(state.accountOwnerDocumentAttachment.list.data, state.accountOwnerDocumentAttachment.edit.data);
    }
    case AccountOwnerDocumentAttachmentAction.DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareListFailed(state.accountOwnerDocumentAttachment.list.data, emptyEditData);
    }

    case AccountOwnerDocumentAttachmentAction.NEW_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT: {
      return prepareSuccess(state.accountOwnerDocumentAttachment.list.data, emptyEditData);
    }

    default:
      return state.accountOwnerDocumentAttachment;
  }
};

/* Selectors */
export const getAccountOwnerDocumentAttachmentEditData = state => state.accounts.accountOwnerDocumentAttachment.edit.data;
export const getAccountOwnerDocumentAttachmentListData = state => state.accounts.accountOwnerDocumentAttachment.list.data;
export const getAccountOwnerDocumentAttachmentIsLoading = state => state.accounts.accountOwnerDocumentAttachment.list.isLoading ||
                                                                   state.accounts.accountOwnerDocumentAttachment.edit.isLoading;
export const getAccountOwnerDocumentAttachmentIsRequestError = state => state.accounts.accountOwnerDocumentAttachment.list.isRequestError ||
                                                                        state.accounts.accountOwnerDocumentAttachment.edit.isRequestError;
export const getAccountOwnerDocumentAttachmentIsSaved = state => state.accounts.accountOwnerDocumentAttachment.isSaved;
export const getAccountOwnerDocumentAttachmentIsDeleted = state => state.accounts.accountOwnerDocumentAttachment.isDeleted;
