import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as DocumentTypeAction from './../actions/DocumentTypeAction';
import * as DocumentTypeApi from './../api/DocumentTypeApi';
import * as DocumentTypePath from './../paths/DocumentTypePath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getDocumentTypes(action) {
  const response = yield call(DocumentTypeApi.getDocumentTypes, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(DocumentTypeAction.getDocumentTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(DocumentTypeAction.getDocumentTypesFailed());
  }
}

export function* watchGetDocumentTypes() {
  yield takeLatest(DocumentTypeAction.GET_DOCUMENT_TYPES, getDocumentTypes);
}

export function* getDocumentType(action) {
  const response = yield call(DocumentTypeApi.getDocumentType, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(DocumentTypeAction.getDocumentTypeSuccess(response));
  } else if (!response.canceled) {
    yield put(DocumentTypeAction.getDocumentTypeFailed(action.id));
  }
}

export function* watchGetDocumentType() {
  yield takeLatest(DocumentTypeAction.GET_DOCUMENT_TYPE, getDocumentType);
}

export function* saveDocumentType(action) {
  const response = yield call(DocumentTypeApi.saveDocumentType, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(DocumentTypeAction.saveDocumentTypeSuccess(response));
    yield call(browserHistory.push, DocumentTypePath.DOCUMENT_TYPE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(DocumentTypeAction.saveDocumentTypeFailed(data));
  }
}

export function* watchSaveDocumentType() {
  yield takeLatest(DocumentTypeAction.SAVE_DOCUMENT_TYPE, saveDocumentType);
}

export function* deleteDocumentType(action) {
  const response = yield call(DocumentTypeApi.deleteDocumentType, action.object);
  if (response === '') {
    yield put(DocumentTypeAction.deleteDocumentTypeSuccess(action.object));
    yield put(DocumentTypeAction.getDocumentTypes());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(DocumentTypeAction.deleteDocumentTypeFailed(data));
  }
}

export function* watchDeleteDocumentType() {
  yield takeLatest(DocumentTypeAction.DELETE_DOCUMENT_TYPE, deleteDocumentType);
}

export function* newDocumentType() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewDocumentType() {
  yield takeLatest(DocumentTypeAction.NEW_DOCUMENT_TYPE, newDocumentType);
}

export function* findDocumentTypesByName(action) {
  const response = yield call(DocumentTypeApi.findDocumentTypesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(DocumentTypeAction.getDocumentTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(DocumentTypeAction.getDocumentTypesFailed());
  }
}

export function* watchFindDocumentTypesByName() {
  yield takeLatest(DocumentTypeAction.FIND_DOCUMENT_TYPES_BY_NAME, findDocumentTypesByName);
}

export const rootDocumentTypeSaga = [
  fork(watchGetDocumentTypes),
  fork(watchGetDocumentType),
  fork(watchSaveDocumentType),
  fork(watchDeleteDocumentType),
  fork(watchNewDocumentType),
  fork(watchFindDocumentTypesByName),
];
