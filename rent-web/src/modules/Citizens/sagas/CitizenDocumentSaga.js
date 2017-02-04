import { call, put, fork, takeLatest } from 'redux-saga/effects';

import * as CitizenDocumentAction from './../actions/CitizenDocumentAction';
import * as CitizenDocumentApi from './../api/CitizenDocumentApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getCitizenDocuments(action) {
  const response = yield call(CitizenDocumentApi.getCitizenDocuments, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(CitizenDocumentAction.getCitizenDocumentsSuccess(response));
  } else if (!response.canceled) {
    yield put(CitizenDocumentAction.getCitizenDocumentsFailed());
  }
}

export function* watchGetCitizenDocuments() {
  yield takeLatest(CitizenDocumentAction.GET_CITIZEN_DOCUMENTS, getCitizenDocuments);
}

export function* getCitizenDocument(action) {
  const response = yield call(CitizenDocumentApi.getCitizenDocument, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(CitizenDocumentAction.getCitizenDocumentSuccess(response));
  } else if (!response.canceled) {
    yield put(CitizenDocumentAction.getCitizenDocumentFailed(action.id));
  }
}

export function* watchGetCitizenDocument() {
  yield takeLatest(CitizenDocumentAction.GET_CITIZEN_DOCUMENT, getCitizenDocument);
}

export function* saveCitizenDocument(action) {
  const response = yield call(CitizenDocumentApi.saveCitizenDocument, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(CitizenDocumentAction.saveCitizenDocumentSuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(CitizenDocumentAction.saveCitizenDocumentFailed(data));
  }
}

export function* watchSaveCitizenDocument() {
  yield takeLatest(CitizenDocumentAction.SAVE_CITIZEN_DOCUMENT, saveCitizenDocument);
}

export function* deleteCitizenDocument(action) {
  const response = yield call(CitizenDocumentApi.deleteCitizenDocument, action.object);
  if (response === '') {
    yield put(CitizenDocumentAction.deleteCitizenDocumentSuccess(action.object));
    yield put(CitizenDocumentAction.getCitizenDocuments());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(CitizenDocumentAction.deleteCitizenDocumentFailed(data));
  }
}

export function* watchDeleteCitizenDocument() {
  yield takeLatest(CitizenDocumentAction.DELETE_CITIZEN_DOCUMENT, deleteCitizenDocument);
}

export function* newCitizenDocument() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewCitizenDocument() {
  yield takeLatest(CitizenDocumentAction.NEW_CITIZEN_DOCUMENT, newCitizenDocument);
}

export const rootCitizenDocumentSaga = [
  fork(watchGetCitizenDocuments),
  fork(watchGetCitizenDocument),
  fork(watchSaveCitizenDocument),
  fork(watchDeleteCitizenDocument),
  fork(watchNewCitizenDocument),
];
