import moment from 'moment';

import * as CitizenAction from './../actions/CitizenAction';
import * as CitizenDocumentAction from './../actions/CitizenDocumentAction';
import * as CitizenDocumentAttachmentAction from './../actions/CitizenDocumentAttachmentAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

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
  dateStart: moment(),
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
    case CitizenAction.GET_CITIZEN:
    case CitizenAction.SAVE_CITIZEN: {
      return prepareEdit(state.citizen.edit.data, true, false, false, false);
    }
    case CitizenAction.FIND_CITIZENS:
    case CitizenAction.GET_CITIZENS:
    case CitizenAction.DELETE_CITIZEN: {
      return prepareList(state.citizen.list.data, emptyEditData, true, false, false, false);
    }

    case CitizenAction.GET_CITIZEN_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case CitizenAction.GET_CITIZENS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case CitizenAction.GET_CITIZEN_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case CitizenAction.GET_CITIZENS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case CitizenAction.SAVE_CITIZEN_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case CitizenAction.DELETE_CITIZEN_SUCCESS: {
      return prepareList(state.citizen.list.data, emptyEditData, false, false, false, true);
    }

    case CitizenAction.SAVE_CITIZEN_FAILED: {
      return prepareEdit(state.citizen.edit.data, false, true, false, false);
    }
    case CitizenAction.DELETE_CITIZEN_FAILED: {
      return prepareList(state.citizen.list.data, emptyEditData, false, true, false, false);
    }

    case CitizenAction.NEW_CITIZEN: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    case CitizenAction.ADD_NEW_DOCUMENT_TO_CITIZEN: {
      const newObj = state.citizen.edit.data;
      newObj.documents.push(action.document);
      return prepareEdit(newObj, false, false, false, false);
    }

    case CitizenAction.EDIT_DOCUMENT_IN_CITIZEN: {
      const newObj = state.citizen.edit.data;
      newObj.documents = newObj.documents.filter(document => document.id !== action.document.id);
      newObj.documents.push(action.document);
      return prepareEdit(newObj, false, false, false, false);
    }

    case CitizenAction.REMOVE_DOCUMENT_FROM_CITIZEN: {
      const newObj = action.document;
      newObj.documents = newObj.documents.filter(document => document.id !== action.document.id);
      return prepareEdit(newObj, false, false, false, false);
    }

    case CitizenAction.ADD_NEW_ATTACHMENT_TO_DOCUMENT: {
      const newObj = action.document;
      newObj.documentAttachments.push(action.attachment);
      return state.citizen;
    }

    case CitizenAction.EDIT_ATTACHMENT_IN_DOCUMENT: {
      const newObj = action.document;
      newObj.documentAttachments = newObj.documentAttachments.filter(attachment => attachment.id !== action.attachment.id);
      newObj.documentAttachments.push(action.attachment);
      return state.citizen;
    }

    case CitizenAction.REMOVE_ATTACHMENT_FROM_DOCUMENT: {
      const newObj = action.document;
      newObj.documentAttachments = newObj.documentAttachments.filter(attachment => attachment.id !== action.attachment.id);
      return state.citizen;
    }

    case CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT:
    case CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS:
    case CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED:
    case CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT:
    case CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT_SUCCESS:
    case CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT_FAILED: {
      return state.citizen;
    }

    default:
      return prepareDefault(state.citizen.list, emptyEditData);
  }
};

/* Selectors */
export const getCitizenEditData = state => state.citizens.citizen.edit.data;
export const getCitizenListData = state => state.citizens.citizen.list.data;
export const getCitizenIsLoading = state => state.citizens.citizen.list.isLoading || state.citizens.citizen.edit.isLoading;
export const getCitizenIsRequestError = state => state.citizens.citizen.list.isRequestError || state.citizens.citizen.edit.isRequestError;
export const getCitizenIsSaved = state => state.citizens.citizen.isSaved;
export const getCitizenIsDeleted = state => state.citizens.citizen.isDeleted;
