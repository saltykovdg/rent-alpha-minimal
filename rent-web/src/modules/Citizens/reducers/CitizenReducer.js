import * as CitizenAction from './../actions/CitizenAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

export const emptyDocumentAttachment = {
  id: '',
  name: '',
  urlLink: '',
};

export const emptyDocument = {
  id: '',
  documentType: {
    id: '',
    name: '',
  },
  documentSeries: '',
  documentNumber: '',
  documentIssuingAuthority: '',
  documentDateIssue: '',
  dateStart: null,
  dateEnd: null,
  documentAttachments: [],
};

const emptyEditData = {
  id: '',
  genderType: {
    id: '',
    name: '',
  },
  firstName: '',
  lastName: '',
  fatherName: '',
  birthday: '',
  documents: [],
};

export const citizenReducer = (state, action) => {
  switch (action.type) {
    case CitizenAction.GET_CITIZEN: {
      return prepareEditLoading(state.citizen.list.data, emptyEditData);
    }
    case CitizenAction.SAVE_CITIZEN: {
      return prepareEditLoading(state.citizen.list.data, state.citizen.edit.data);
    }
    case CitizenAction.FIND_CITIZENS:
    case CitizenAction.GET_CITIZENS:
    case CitizenAction.DELETE_CITIZEN: {
      return prepareListLoading(state.citizen.list.data, emptyEditData);
    }

    case CitizenAction.GET_CITIZEN_SUCCESS: {
      return prepareSuccess(state.citizen.list.data, action.data);
    }
    case CitizenAction.GET_CITIZENS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case CitizenAction.GET_CITIZEN_FAILED: {
      return prepareEditFailed(state.citizen.list.data, emptyEditData);
    }
    case CitizenAction.GET_CITIZENS_FAILED: {
      return prepareListFailed(state.citizen.list.data, emptyEditData);
    }

    case CitizenAction.SAVE_CITIZEN_SUCCESS: {
      return prepareSaveSuccess(state.citizen.list.data, emptyEditData);
    }
    case CitizenAction.DELETE_CITIZEN_SUCCESS: {
      return prepareDeleteSuccess(state.citizen.list.data, emptyEditData);
    }

    case CitizenAction.SAVE_CITIZEN_FAILED: {
      return prepareEditFailed(state.citizen.list.data, state.citizen.edit.data);
    }
    case CitizenAction.DELETE_CITIZEN_FAILED: {
      return prepareListFailed(state.citizen.list.data, emptyEditData);
    }

    case CitizenAction.NEW_CITIZEN: {
      return prepareSuccess(state.citizen.list.data, emptyEditData);
    }

    case CitizenAction.ADD_NEW_DOCUMENT_TO_CITIZEN: {
      const newObj = state.citizen.edit.data;
      newObj.documents.push(action.document);
      return prepareSuccess(state.citizen.list.data, newObj);
    }
    case CitizenAction.EDIT_DOCUMENT_IN_CITIZEN: {
      const newObj = state.citizen.edit.data;
      newObj.documents = newObj.documents.filter(document => document.id !== action.document.id);
      newObj.documents.push(action.document);
      return prepareSuccess(state.citizen.list.data, newObj);
    }
    case CitizenAction.REMOVE_DOCUMENT_FROM_CITIZEN: {
      const newObj = state.citizen.edit.data;
      newObj.documents = newObj.documents.filter(document => document.id !== action.document.id);
      return prepareSuccess(state.citizen.list.data, newObj);
    }

    case CitizenAction.ADD_NEW_ATTACHMENT_TO_CITIZEN_DOCUMENT: {
      const newObj = action.document;
      newObj.documentAttachments.push(action.attachment);
      return state.citizen;
    }
    case CitizenAction.EDIT_ATTACHMENT_IN_CITIZEN_DOCUMENT: {
      const newObj = action.document;
      newObj.documentAttachments = newObj.documentAttachments.filter(attachment => attachment.id !== action.attachment.id);
      newObj.documentAttachments.push(action.attachment);
      return state.citizen;
    }
    case CitizenAction.REMOVE_ATTACHMENT_FROM_CITIZEN_DOCUMENT: {
      const newObj = action.document;
      newObj.documentAttachments = newObj.documentAttachments.filter(attachment => attachment.id !== action.attachment.id);
      return state.citizen;
    }

    case CitizenAction.CLEAR_LOCAL_DATA_CITIZENS: {
      return prepareSuccess(null, emptyEditData);
    }

    default:
      return state.citizen;
  }
};

/* Selectors */
export const getCitizenEditData = state => state.citizens.citizen.edit.data;
export const getCitizenListData = state => state.citizens.citizen.list.data;
export const getCitizenIsLoading = state => state.citizens.citizen.list.isLoading || state.citizens.citizen.edit.isLoading;
export const getCitizenIsRequestError = state => state.citizens.citizen.list.isRequestError || state.citizens.citizen.edit.isRequestError;
export const getCitizenIsSaved = state => state.citizens.citizen.isSaved;
export const getCitizenIsDeleted = state => state.citizens.citizen.isDeleted;
