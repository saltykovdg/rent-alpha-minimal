import { call, put, fork, take, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as GenderTypeAction from './../../Constants/actions/GenderTypeAction';
import * as DocumentTypeAction from './../../Constants/actions/DocumentTypeAction';
import * as CitizenDocumentAction from './../actions/CitizenDocumentAction';
import * as CitizenDocumentAttachmentAction from './../actions/CitizenDocumentAttachmentAction';
import * as CitizenAction from './../actions/CitizenAction';
import * as CitizenApi from './../api/CitizenApi';
import * as CitizenPath from './../paths/CitizenPath';
import * as ApiCaller from '../../../util/ApiCaller';
import * as ObjectUtil from './../../../util/ObjectUtil';

export function* getCitizens(action) {
  const response = yield call(CitizenApi.getCitizens, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(CitizenAction.getCitizensSuccess(response));
  } else if (!response.canceled) {
    yield put(CitizenAction.getCitizensFailed());
  }
}

export function* watchGetCitizens() {
  yield takeLatest(CitizenAction.GET_CITIZENS, getCitizens);
}

export function* getCitizen(action) {
  const response = yield call(CitizenApi.getCitizen, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(GenderTypeAction.findGenderTypesByName());
    let sagaAction = yield take([GenderTypeAction.GET_GENDER_TYPES_SUCCESS, GenderTypeAction.GET_GENDER_TYPES_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(DocumentTypeAction.findDocumentTypesByName());
      sagaAction = yield take([DocumentTypeAction.GET_DOCUMENT_TYPES_SUCCESS, DocumentTypeAction.GET_DOCUMENT_TYPES_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(CitizenAction.getCitizenSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(CitizenAction.getCitizenFailed(action.id));
  }
}

export function* watchGetCitizen() {
  yield takeLatest(CitizenAction.GET_CITIZEN, getCitizen);
}

export function* saveCitizen(action) {
  let sagaAction = null;
  const documents = action.object.documents;
  const documentsLinks = [];
  for (let i = 0; i < documents.length; i += 1) {
    sagaAction = null;
    const documentObj = ObjectUtil.cloneObject(documents[i]);
    documentObj.documentType = ObjectUtil.getLink(documents[i].documentType);

    // save document attachments
    const documentAttachmentsLinks = [];
    for (let j = 0; j < documentObj.documentAttachments.length; j += 1) {
      const documentAttachmentObj = ObjectUtil.cloneObject(documentObj.documentAttachments[j]);
      let attachmentFormData = null;
      if (documentAttachmentObj.file) {
        attachmentFormData = new FormData();
        attachmentFormData.append('file', documentAttachmentObj.file);
      }
      yield put(CitizenDocumentAttachmentAction.saveCitizenDocumentAttachment(documentAttachmentObj, attachmentFormData));
      sagaAction = yield take([CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS, CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT_FAILED]);
      if (sagaAction.type === CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS) {
        documentAttachmentsLinks.push(ObjectUtil.getLink(sagaAction.data));
      } else {
        break;
      }
    }

    // save document
    if (sagaAction == null || (sagaAction && sagaAction.type === CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT_SUCCESS)) {
      documentObj.documentAttachments = documentAttachmentsLinks;
      yield put(CitizenDocumentAction.saveCitizenDocument(documentObj));
      sagaAction = yield take([CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT_SUCCESS, CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT_FAILED]);
      if (sagaAction.type === CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT_SUCCESS) {
        documentsLinks.push(ObjectUtil.getLink(sagaAction.data));
      } else {
        break;
      }
    }
  }

  // save citizen
  if (sagaAction == null || (sagaAction && sagaAction.type === CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT_SUCCESS)) {
    const objectCitizen = ObjectUtil.cloneObject(action.object);
    objectCitizen.documents = documentsLinks;
    const response = yield call(CitizenApi.saveCitizen, objectCitizen);
    if (response && !response.error && !response.canceled) {
      yield put(CitizenAction.saveCitizenSuccess(response));
      yield call(browserHistory.push, CitizenPath.CITIZEN_LIST);
    } else if (!response.canceled) {
      const data = {
        httpStatus: response.status,
        object: action.object,
      };
      yield put(CitizenAction.saveCitizenFailed(data));
    }
  } else if (sagaAction) {
    const data = {
      httpStatus: sagaAction.data.httpStatus,
      object: action.object,
    };
    yield put(CitizenAction.saveCitizenFailed(data));
  }
}

export function* watchSaveCitizen() {
  yield takeLatest(CitizenAction.SAVE_CITIZEN, saveCitizen);
}

export function* deleteCitizen(action) {
  const response = yield call(CitizenApi.deleteCitizen, action.object);
  if (response === '') {
    yield put(CitizenAction.deleteCitizenSuccess(action.object));
    yield put(CitizenAction.getCitizens());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(CitizenAction.deleteCitizenFailed(data));
  }
}

export function* watchDeleteCitizen() {
  yield takeLatest(CitizenAction.DELETE_CITIZEN, deleteCitizen);
}

export function* newCitizen() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(GenderTypeAction.findGenderTypesByName());
  let sagaAction = yield take([GenderTypeAction.GET_GENDER_TYPES_SUCCESS, GenderTypeAction.GET_GENDER_TYPES_FAILED, LOCATION_CHANGE]);
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(DocumentTypeAction.findDocumentTypesByName());
    sagaAction = yield take([DocumentTypeAction.GET_DOCUMENT_TYPES_SUCCESS, DocumentTypeAction.GET_DOCUMENT_TYPES_FAILED, LOCATION_CHANGE]);
  }
}

export function* watchNewCitizen() {
  yield takeLatest(CitizenAction.NEW_CITIZEN, newCitizen);
}

export function* findCitizens(action) {
  const response = yield call(CitizenApi.findCitizens, action.firstName, action.lastName, action.fatherName, action.documentSeries, action.documentNumber, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(CitizenAction.getCitizensSuccess(response));
  } else if (!response.canceled) {
    yield put(CitizenAction.getCitizensFailed());
  }
}

export function* watchFindCitizens() {
  yield takeLatest(CitizenAction.FIND_CITIZENS, findCitizens);
}

export const rootCitizenSaga = [
  fork(watchGetCitizens),
  fork(watchGetCitizen),
  fork(watchSaveCitizen),
  fork(watchDeleteCitizen),
  fork(watchNewCitizen),
  fork(watchFindCitizens),
];
