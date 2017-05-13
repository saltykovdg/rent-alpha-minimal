import * as DocumentTypeAction from './../actions/DocumentTypeAction';
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

export const documentTypeReducer = (state, action) => {
  switch (action.type) {
    case DocumentTypeAction.GET_DOCUMENT_TYPE: {
      return prepareEditLoading(state.documentType.list.data, emptyEditData);
    }
    case DocumentTypeAction.SAVE_DOCUMENT_TYPE: {
      return prepareEditLoading(state.documentType.list.data, state.documentType.edit.data);
    }
    case DocumentTypeAction.FIND_DOCUMENT_TYPES_BY_NAME:
    case DocumentTypeAction.GET_DOCUMENT_TYPES:
    case DocumentTypeAction.DELETE_DOCUMENT_TYPE: {
      return prepareListLoading(state.documentType.list.data, emptyEditData);
    }

    case DocumentTypeAction.GET_DOCUMENT_TYPE_SUCCESS: {
      return prepareSuccess(state.documentType.list.data, action.data);
    }
    case DocumentTypeAction.GET_DOCUMENT_TYPES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case DocumentTypeAction.GET_DOCUMENT_TYPE_FAILED: {
      return prepareEditFailed(state.documentType.list.data, emptyEditData);
    }
    case DocumentTypeAction.GET_DOCUMENT_TYPES_FAILED: {
      return prepareListFailed(state.documentType.list.data, emptyEditData);
    }

    case DocumentTypeAction.SAVE_DOCUMENT_TYPE_SUCCESS: {
      return prepareSaveSuccess(state.documentType.list.data, emptyEditData);
    }
    case DocumentTypeAction.DELETE_DOCUMENT_TYPE_SUCCESS: {
      return prepareDeleteSuccess(state.documentType.list.data, emptyEditData);
    }

    case DocumentTypeAction.SAVE_DOCUMENT_TYPE_FAILED: {
      return prepareEditFailed(state.documentType.list.data, state.documentType.edit.data);
    }
    case DocumentTypeAction.DELETE_DOCUMENT_TYPE_FAILED: {
      return prepareListFailed(state.documentType.list.data, emptyEditData);
    }

    case DocumentTypeAction.NEW_DOCUMENT_TYPE: {
      return prepareSuccess(state.documentType.list.data, emptyEditData);
    }

    default:
      return state.documentType;
  }
};

/* Selectors */
export const getDocumentTypeEditData = state => state.constants.documentType.edit.data;
export const getDocumentTypeListData = state => state.constants.documentType.list.data;
export const getDocumentTypeIsLoading = state => state.constants.documentType.list.isLoading || state.constants.documentType.edit.isLoading;
export const getDocumentTypeIsRequestError = state => state.constants.documentType.list.isRequestError || state.constants.documentType.edit.isRequestError;
export const getDocumentTypeIsSaved = state => state.constants.documentType.isSaved;
export const getDocumentTypeIsDeleted = state => state.constants.documentType.isDeleted;
