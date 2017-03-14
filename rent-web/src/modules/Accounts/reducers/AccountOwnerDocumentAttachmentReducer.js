import * as AccountOwnerDocumentAttachmentAction from './../actions/AccountOwnerDocumentAttachmentAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const accountOwnerDocumentAttachmentReducer = (state, action) => {
  switch (action.type) {
    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT:
    case AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT: {
      return prepareEdit(state.accountOwnerDocumentAttachment.edit.data, true, false, false, false);
    }
    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS:
    case AccountOwnerDocumentAttachmentAction.DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT: {
      return prepareList(state.accountOwnerDocumentAttachment.list.data, emptyEditData, true, false, false, false);
    }

    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AccountOwnerDocumentAttachmentAction.DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareList(state.accountOwnerDocumentAttachment.list.data, emptyEditData, false, false, false, true);
    }

    case AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEdit(state.accountOwnerDocumentAttachment.edit.data, false, true, false, false);
    }
    case AccountOwnerDocumentAttachmentAction.DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareList(state.accountOwnerDocumentAttachment.list.data, emptyEditData, false, true, false, false);
    }

    case AccountOwnerDocumentAttachmentAction.NEW_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.accountOwnerDocumentAttachment.list, emptyEditData);
  }
};

/* Selectors */
export const getAccountOwnerDocumentAttachmentEditData = state => state.accounts.accountOwnerDocumentAttachment.edit.data;
export const getAccountOwnerDocumentAttachmentListData = state => state.accounts.accountOwnerDocumentAttachment.list.data;
export const getAccountOwnerDocumentAttachmentIsLoading = state => state.accounts.accountOwnerDocumentAttachment.list.isLoading || state.accounts.accountOwnerDocumentAttachment.edit.isLoading;
export const getAccountOwnerDocumentAttachmentIsRequestError = state => state.accounts.accountOwnerDocumentAttachment.list.isRequestError || state.accounts.accountOwnerDocumentAttachment.edit.isRequestError;
export const getAccountOwnerDocumentAttachmentIsSaved = state => state.accounts.accountOwnerDocumentAttachment.isSaved;
export const getAccountOwnerDocumentAttachmentIsDeleted = state => state.accounts.accountOwnerDocumentAttachment.isDeleted;
