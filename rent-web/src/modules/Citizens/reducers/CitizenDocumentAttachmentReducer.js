import * as CitizenDocumentAttachmentAction from './../actions/CitizenDocumentAttachmentAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

export const citizenDocumentAttachmentReducer = (state, action) => {
  switch (action.type) {
    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENT:
    case CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT: {
      return prepareEdit(state.citizenDocumentAttachment.edit.data, true, false, false, false);
    }
    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENTS:
    case CitizenDocumentAttachmentAction.DELETE_CITIZEN_DOCUMENT_ATTACHMENT: {
      return prepareList(state.citizenDocumentAttachment.list.data, emptyEditData, true, false, false, false);
    }

    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENTS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENTS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case CitizenDocumentAttachmentAction.DELETE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareList(state.citizenDocumentAttachment.list.data, emptyEditData, false, false, false, true);
    }

    case CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEdit(state.citizenDocumentAttachment.edit.data, false, true, false, false);
    }
    case CitizenDocumentAttachmentAction.DELETE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareList(state.citizenDocumentAttachment.list.data, emptyEditData, false, true, false, false);
    }

    case CitizenDocumentAttachmentAction.NEW_CITIZEN_DOCUMENT_ATTACHMENT: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.citizenDocumentAttachment.list, emptyEditData);
  }
};

/* Selectors */
export const getCitizenDocumentAttachmentEditData = state => state.citizens.citizenDocumentAttachment.edit.data;
export const getCitizenDocumentAttachmentListData = state => state.citizens.citizenDocumentAttachment.list.data;
export const getCitizenDocumentAttachmentIsLoading = state => state.citizens.citizenDocumentAttachment.list.isLoading || state.citizens.citizenDocumentAttachment.edit.isLoading;
export const getCitizenDocumentAttachmentIsRequestError = state => state.citizens.citizenDocumentAttachment.list.isRequestError || state.citizens.citizenDocumentAttachment.edit.isRequestError;
export const getCitizenDocumentAttachmentIsSaved = state => state.citizens.citizenDocumentAttachment.isSaved;
export const getCitizenDocumentAttachmentIsDeleted = state => state.citizens.citizenDocumentAttachment.isDeleted;
