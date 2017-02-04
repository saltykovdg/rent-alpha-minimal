import * as CitizenDocumentAction from './../actions/CitizenDocumentAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const citizenDocumentReducer = (state, action) => {
  switch (action.type) {
    case CitizenDocumentAction.GET_CITIZEN_DOCUMENT:
    case CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT: {
      return prepareEdit(state.citizenDocument.edit.data, true, false, false, false);
    }
    case CitizenDocumentAction.GET_CITIZEN_DOCUMENTS:
    case CitizenDocumentAction.DELETE_CITIZEN_DOCUMENT: {
      return prepareList(state.citizenDocument.list.data, emptyEditData, true, false, false, false);
    }

    case CitizenDocumentAction.GET_CITIZEN_DOCUMENT_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case CitizenDocumentAction.GET_CITIZEN_DOCUMENTS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case CitizenDocumentAction.GET_CITIZEN_DOCUMENT_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case CitizenDocumentAction.GET_CITIZEN_DOCUMENTS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case CitizenDocumentAction.DELETE_CITIZEN_DOCUMENT_SUCCESS: {
      return prepareList(state.citizenDocument.list.data, emptyEditData, false, false, false, true);
    }

    case CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT_FAILED: {
      return prepareEdit(state.citizenDocument.edit.data, false, true, false, false);
    }
    case CitizenDocumentAction.DELETE_CITIZEN_DOCUMENT_FAILED: {
      return prepareList(state.citizenDocument.list.data, emptyEditData, false, true, false, false);
    }

    case CitizenDocumentAction.NEW_CITIZEN_DOCUMENT: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.citizenDocument.list, emptyEditData);
  }
};

/* Selectors */
export const getCitizenDocumentEditData = state => state.citizens.citizenDocument.edit.data;
export const getCitizenDocumentListData = state => state.citizens.citizenDocument.list.data;
export const getCitizenDocumentIsLoading = state => state.citizens.citizenDocument.list.isLoading || state.citizens.citizenDocument.edit.isLoading;
export const getCitizenDocumentIsRequestError = state => state.citizens.citizenDocument.list.isRequestError || state.citizens.citizenDocument.edit.isRequestError;
export const getCitizenDocumentIsSaved = state => state.citizens.citizenDocument.isSaved;
export const getCitizenDocumentIsDeleted = state => state.citizens.citizenDocument.isDeleted;
