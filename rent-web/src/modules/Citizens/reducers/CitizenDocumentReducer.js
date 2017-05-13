import * as CitizenDocumentAction from './../actions/CitizenDocumentAction';
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

export const citizenDocumentReducer = (state, action) => {
  switch (action.type) {
    case CitizenDocumentAction.GET_CITIZEN_DOCUMENT: {
      return prepareEditLoading(state.citizenDocument.list.data, emptyEditData);
    }
    case CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT: {
      return prepareEditLoading(state.citizenDocument.list.data, state.citizenDocument.edit.data);
    }
    case CitizenDocumentAction.GET_CITIZEN_DOCUMENTS:
    case CitizenDocumentAction.DELETE_CITIZEN_DOCUMENT: {
      return prepareListLoading(state.citizenDocument.list.data, emptyEditData);
    }

    case CitizenDocumentAction.GET_CITIZEN_DOCUMENT_SUCCESS: {
      return prepareSuccess(state.citizenDocument.list.data, action.data);
    }
    case CitizenDocumentAction.GET_CITIZEN_DOCUMENTS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case CitizenDocumentAction.GET_CITIZEN_DOCUMENT_FAILED: {
      return prepareEditFailed(state.citizenDocument.list.data, emptyEditData);
    }
    case CitizenDocumentAction.GET_CITIZEN_DOCUMENTS_FAILED: {
      return prepareListFailed(state.citizenDocument.list.data, emptyEditData);
    }

    case CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT_SUCCESS: {
      return prepareSaveSuccess(state.citizenDocument.list.data, emptyEditData);
    }
    case CitizenDocumentAction.DELETE_CITIZEN_DOCUMENT_SUCCESS: {
      return prepareDeleteSuccess(state.citizenDocument.list.data, emptyEditData);
    }

    case CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT_FAILED: {
      return prepareEditFailed(state.citizenDocument.list.data, state.citizenDocument.edit.data);
    }
    case CitizenDocumentAction.DELETE_CITIZEN_DOCUMENT_FAILED: {
      return prepareListFailed(state.citizenDocument.list.data, emptyEditData);
    }

    case CitizenDocumentAction.NEW_CITIZEN_DOCUMENT: {
      return prepareSuccess(state.citizenDocument.list.data, emptyEditData);
    }

    default:
      return state.citizenDocument;
  }
};

/* Selectors */
export const getCitizenDocumentEditData = state => state.citizens.citizenDocument.edit.data;
export const getCitizenDocumentListData = state => state.citizens.citizenDocument.list.data;
export const getCitizenDocumentIsLoading = state => state.citizens.citizenDocument.list.isLoading || state.citizens.citizenDocument.edit.isLoading;
export const getCitizenDocumentIsRequestError = state => state.citizens.citizenDocument.list.isRequestError || state.citizens.citizenDocument.edit.isRequestError;
export const getCitizenDocumentIsSaved = state => state.citizens.citizenDocument.isSaved;
export const getCitizenDocumentIsDeleted = state => state.citizens.citizenDocument.isDeleted;
