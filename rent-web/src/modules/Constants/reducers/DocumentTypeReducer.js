import * as DocumentTypeAction from './../actions/DocumentTypeAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

export const documentTypeReducer = (state, action) => {
  switch (action.type) {
    case DocumentTypeAction.GET_DOCUMENT_TYPE:
    case DocumentTypeAction.SAVE_DOCUMENT_TYPE: {
      return prepareEdit(state.documentType.edit.data, true, false, false, false);
    }
    case DocumentTypeAction.FIND_DOCUMENT_TYPES_BY_NAME:
    case DocumentTypeAction.GET_DOCUMENT_TYPES:
    case DocumentTypeAction.DELETE_DOCUMENT_TYPE: {
      return prepareList(state.documentType.list.data, emptyEditData, true, false, false, false);
    }

    case DocumentTypeAction.GET_DOCUMENT_TYPE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case DocumentTypeAction.GET_DOCUMENT_TYPES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case DocumentTypeAction.GET_DOCUMENT_TYPE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case DocumentTypeAction.GET_DOCUMENT_TYPES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case DocumentTypeAction.SAVE_DOCUMENT_TYPE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case DocumentTypeAction.DELETE_DOCUMENT_TYPE_SUCCESS: {
      return prepareList(state.documentType.list.data, emptyEditData, false, false, false, true);
    }

    case DocumentTypeAction.SAVE_DOCUMENT_TYPE_FAILED: {
      return prepareEdit(state.documentType.edit.data, false, true, false, false);
    }
    case DocumentTypeAction.DELETE_DOCUMENT_TYPE_FAILED: {
      return prepareList(state.documentType.list.data, emptyEditData, false, true, false, false);
    }

    case DocumentTypeAction.NEW_DOCUMENT_TYPE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.documentType.list, emptyEditData);
  }
};

/* Selectors */
export const getDocumentTypeEditData = state => state.constants.documentType.edit.data;
export const getDocumentTypeListData = state => state.constants.documentType.list.data;
export const getDocumentTypeIsLoading = state => state.constants.documentType.list.isLoading || state.constants.documentType.edit.isLoading;
export const getDocumentTypeIsRequestError = state => state.constants.documentType.list.isRequestError || state.constants.documentType.edit.isRequestError;
export const getDocumentTypeIsSaved = state => state.constants.documentType.isSaved;
export const getDocumentTypeIsDeleted = state => state.constants.documentType.isDeleted;
