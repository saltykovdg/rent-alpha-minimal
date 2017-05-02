import { call, put, fork, takeLatest, all } from 'redux-saga/effects';

import * as AccountRegisteredDocumentAttachmentAction from './../actions/AccountRegisteredDocumentAttachmentAction';
import * as AccountRegisteredDocumentAttachmentApi from './../api/AccountRegisteredDocumentAttachmentApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getAccountRegisteredDocumentAttachments(action) {
  const response = yield call(AccountRegisteredDocumentAttachmentApi.getAccountRegisteredDocumentAttachments, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountRegisteredDocumentAttachmentAction.getAccountRegisteredDocumentAttachmentsSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountRegisteredDocumentAttachmentAction.getAccountRegisteredDocumentAttachmentsFailed());
  }
}

export function* watchGetAccountRegisteredDocumentAttachments() {
  yield takeLatest(AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENTS, getAccountRegisteredDocumentAttachments);
}

export function* getAccountRegisteredDocumentAttachment(action) {
  const response = yield call(AccountRegisteredDocumentAttachmentApi.getAccountRegisteredDocumentAttachment, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(AccountRegisteredDocumentAttachmentAction.getAccountRegisteredDocumentAttachmentSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountRegisteredDocumentAttachmentAction.getAccountRegisteredDocumentAttachmentFailed(action.id));
  }
}

export function* watchGetAccountRegisteredDocumentAttachment() {
  yield takeLatest(AccountRegisteredDocumentAttachmentAction.GET_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT, getAccountRegisteredDocumentAttachment);
}

export function* saveAccountRegisteredDocumentAttachment(action) {
  let response = action.object.urlLink;
  if (action.attachment) {
    response = yield call(ApiCaller.uploadFile, action.attachment);
  }
  if (response && !response.error && !response.canceled) {
    const newObj = action.object;
    newObj.urlLink = response;
    response = yield call(AccountRegisteredDocumentAttachmentApi.saveAccountRegisteredDocumentAttachment, action.object);
    if (response && !response.error && !response.canceled) {
      yield put(AccountRegisteredDocumentAttachmentAction.saveAccountRegisteredDocumentAttachmentSuccess(response));
    } else if (!response.canceled) {
      const data = {
        httpStatus: response.status,
        object: action.object,
      };
      yield put(AccountRegisteredDocumentAttachmentAction.saveAccountRegisteredDocumentAttachmentFailed(data));
    }
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountRegisteredDocumentAttachmentAction.saveAccountRegisteredDocumentAttachmentFailed(data));
  }
}

export function* watchSaveAccountRegisteredDocumentAttachment() {
  yield takeLatest(AccountRegisteredDocumentAttachmentAction.SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT, saveAccountRegisteredDocumentAttachment);
}

export function* deleteAccountRegisteredDocumentAttachment(action) {
  const response = yield call(AccountRegisteredDocumentAttachmentApi.deleteAccountRegisteredDocumentAttachment, action.object);
  if (response === '') {
    yield put(AccountRegisteredDocumentAttachmentAction.deleteAccountRegisteredDocumentAttachmentSuccess(action.object));
    yield put(AccountRegisteredDocumentAttachmentAction.getAccountRegisteredDocumentAttachments());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountRegisteredDocumentAttachmentAction.deleteAccountRegisteredDocumentAttachmentFailed(data));
  }
}

export function* watchDeleteAccountRegisteredDocumentAttachment() {
  yield takeLatest(AccountRegisteredDocumentAttachmentAction.DELETE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT, deleteAccountRegisteredDocumentAttachment);
}

export function* newAccountRegisteredDocumentAttachment() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewAccountRegisteredDocumentAttachment() {
  yield takeLatest(AccountRegisteredDocumentAttachmentAction.NEW_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT, newAccountRegisteredDocumentAttachment);
}

export const rootAccountRegisteredDocumentAttachmentSaga = all([
  fork(watchGetAccountRegisteredDocumentAttachments),
  fork(watchGetAccountRegisteredDocumentAttachment),
  fork(watchSaveAccountRegisteredDocumentAttachment),
  fork(watchDeleteAccountRegisteredDocumentAttachment),
  fork(watchNewAccountRegisteredDocumentAttachment),
]);
