import * as CitizenDocumentAttachmentAction from './../actions/CitizenDocumentAttachmentAction';
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
  name: '',
};

export const citizenDocumentAttachmentReducer = (state, action) => {
  switch (action.type) {
    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENT: {
      return prepareEditLoading(state.citizenDocumentAttachment.list.data, emptyEditData);
    }
    case CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT: {
      return prepareEditLoading(state.citizenDocumentAttachment.list.data, state.citizenDocumentAttachment.edit.data);
    }
    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENTS:
    case CitizenDocumentAttachmentAction.DELETE_CITIZEN_DOCUMENT_ATTACHMENT: {
      return prepareListLoading(state.citizenDocumentAttachment.list.data, emptyEditData);
    }

    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareSuccess(state.citizenDocumentAttachment.list.data, action.data);
    }
    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENTS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEditFailed(state.citizenDocumentAttachment.list.data, emptyEditData);
    }
    case CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENTS_FAILED: {
      return prepareListFailed(state.citizenDocumentAttachment.list.data, emptyEditData);
    }

    case CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareSaveSuccess(state.citizenDocumentAttachment.list.data, emptyEditData);
    }
    case CitizenDocumentAttachmentAction.DELETE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS: {
      return prepareDeleteSuccess(state.citizenDocumentAttachment.list.data, emptyEditData);
    }

    case CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareEditFailed(state.citizenDocumentAttachment.list.data, state.citizenDocumentAttachment.edit.data);
    }
    case CitizenDocumentAttachmentAction.DELETE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED: {
      return prepareListFailed(state.citizenDocumentAttachment.list.data, emptyEditData);
    }

    case CitizenDocumentAttachmentAction.NEW_CITIZEN_DOCUMENT_ATTACHMENT: {
      return prepareSuccess(state.citizenDocumentAttachment.list.data, emptyEditData);
    }

    default:
      return state.citizenDocumentAttachment;
  }
};

/* Selectors */
export const getCitizenDocumentAttachmentEditData = state => state.citizens.citizenDocumentAttachment.edit.data;
export const getCitizenDocumentAttachmentListData = state => state.citizens.citizenDocumentAttachment.list.data;
export const getCitizenDocumentAttachmentIsLoading = state => state.citizens.citizenDocumentAttachment.list.isLoading ||
                                                              state.citizens.citizenDocumentAttachment.edit.isLoading;
export const getCitizenDocumentAttachmentIsRequestError = state => state.citizens.citizenDocumentAttachment.list.isRequestError ||
                                                                   state.citizens.citizenDocumentAttachment.edit.isRequestError;
export const getCitizenDocumentAttachmentIsSaved = state => state.citizens.citizenDocumentAttachment.isSaved;
export const getCitizenDocumentAttachmentIsDeleted = state => state.citizens.citizenDocumentAttachment.isDeleted;
