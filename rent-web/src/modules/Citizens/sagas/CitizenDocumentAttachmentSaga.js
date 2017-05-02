import { call, put, fork, takeLatest, all } from 'redux-saga/effects';

import * as CitizenDocumentAttachmentAction from './../actions/CitizenDocumentAttachmentAction';
import * as CitizenDocumentAttachmentApi from './../api/CitizenDocumentAttachmentApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getCitizenDocumentAttachments(action) {
  const response = yield call(CitizenDocumentAttachmentApi.getCitizenDocumentAttachments, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(CitizenDocumentAttachmentAction.getCitizenDocumentAttachmentsSuccess(response));
  } else if (!response.canceled) {
    yield put(CitizenDocumentAttachmentAction.getCitizenDocumentAttachmentsFailed());
  }
}

export function* watchGetCitizenDocumentAttachments() {
  yield takeLatest(CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENTS, getCitizenDocumentAttachments);
}

export function* getCitizenDocumentAttachment(action) {
  const response = yield call(CitizenDocumentAttachmentApi.getCitizenDocumentAttachment, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(CitizenDocumentAttachmentAction.getCitizenDocumentAttachmentSuccess(response));
  } else if (!response.canceled) {
    yield put(CitizenDocumentAttachmentAction.getCitizenDocumentAttachmentFailed(action.id));
  }
}

export function* watchGetCitizenDocumentAttachment() {
  yield takeLatest(CitizenDocumentAttachmentAction.GET_CITIZEN_DOCUMENT_ATTACHMENT, getCitizenDocumentAttachment);
}

export function* saveCitizenDocumentAttachment(action) {
  let response = action.object.urlLink;
  if (action.attachment) {
    response = yield call(ApiCaller.uploadFile, action.attachment);
  }
  if (response && !response.error && !response.canceled) {
    const newObj = action.object;
    newObj.urlLink = response;
    response = yield call(CitizenDocumentAttachmentApi.saveCitizenDocumentAttachment, action.object);
    if (response && !response.error && !response.canceled) {
      yield put(CitizenDocumentAttachmentAction.saveCitizenDocumentAttachmentSuccess(response));
    } else if (!response.canceled) {
      const data = {
        httpStatus: response.status,
        object: action.object,
      };
      yield put(CitizenDocumentAttachmentAction.saveCitizenDocumentAttachmentFailed(data));
    }
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(CitizenDocumentAttachmentAction.saveCitizenDocumentAttachmentFailed(data));
  }
}

export function* watchSaveCitizenDocumentAttachment() {
  yield takeLatest(CitizenDocumentAttachmentAction.SAVE_CITIZEN_DOCUMENT_ATTACHMENT, saveCitizenDocumentAttachment);
}

export function* deleteCitizenDocumentAttachment(action) {
  const response = yield call(CitizenDocumentAttachmentApi.deleteCitizenDocumentAttachment, action.object);
  if (response === '') {
    yield put(CitizenDocumentAttachmentAction.deleteCitizenDocumentAttachmentSuccess(action.object));
    yield put(CitizenDocumentAttachmentAction.getCitizenDocumentAttachments());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(CitizenDocumentAttachmentAction.deleteCitizenDocumentAttachmentFailed(data));
  }
}

export function* watchDeleteCitizenDocumentAttachment() {
  yield takeLatest(CitizenDocumentAttachmentAction.DELETE_CITIZEN_DOCUMENT_ATTACHMENT, deleteCitizenDocumentAttachment);
}

export function* newCitizenDocumentAttachment() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewCitizenDocumentAttachment() {
  yield takeLatest(CitizenDocumentAttachmentAction.NEW_CITIZEN_DOCUMENT_ATTACHMENT, newCitizenDocumentAttachment);
}

export const rootCitizenDocumentAttachmentSaga = all([
  fork(watchGetCitizenDocumentAttachments),
  fork(watchGetCitizenDocumentAttachment),
  fork(watchSaveCitizenDocumentAttachment),
  fork(watchDeleteCitizenDocumentAttachment),
  fork(watchNewCitizenDocumentAttachment),
]);
