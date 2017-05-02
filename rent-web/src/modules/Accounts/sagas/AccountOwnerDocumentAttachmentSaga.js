import { call, put, fork, takeLatest, all } from 'redux-saga/effects';

import * as AccountOwnerDocumentAttachmentAction from './../actions/AccountOwnerDocumentAttachmentAction';
import * as AccountOwnerDocumentAttachmentApi from './../api/AccountOwnerDocumentAttachmentApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getAccountOwnerDocumentAttachments(action) {
  const response = yield call(AccountOwnerDocumentAttachmentApi.getAccountOwnerDocumentAttachments, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountOwnerDocumentAttachmentAction.getAccountOwnerDocumentAttachmentsSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountOwnerDocumentAttachmentAction.getAccountOwnerDocumentAttachmentsFailed());
  }
}

export function* watchGetAccountOwnerDocumentAttachments() {
  yield takeLatest(AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENTS, getAccountOwnerDocumentAttachments);
}

export function* getAccountOwnerDocumentAttachment(action) {
  const response = yield call(AccountOwnerDocumentAttachmentApi.getAccountOwnerDocumentAttachment, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(AccountOwnerDocumentAttachmentAction.getAccountOwnerDocumentAttachmentSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountOwnerDocumentAttachmentAction.getAccountOwnerDocumentAttachmentFailed(action.id));
  }
}

export function* watchGetAccountOwnerDocumentAttachment() {
  yield takeLatest(AccountOwnerDocumentAttachmentAction.GET_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT, getAccountOwnerDocumentAttachment);
}

export function* saveAccountOwnerDocumentAttachment(action) {
  let response = action.object.urlLink;
  if (action.attachment) {
    response = yield call(ApiCaller.uploadFile, action.attachment);
  }
  if (response && !response.error && !response.canceled) {
    const newObj = action.object;
    newObj.urlLink = response;
    response = yield call(AccountOwnerDocumentAttachmentApi.saveAccountOwnerDocumentAttachment, action.object);
    if (response && !response.error && !response.canceled) {
      yield put(AccountOwnerDocumentAttachmentAction.saveAccountOwnerDocumentAttachmentSuccess(response));
    } else if (!response.canceled) {
      const data = {
        httpStatus: response.status,
        object: action.object,
      };
      yield put(AccountOwnerDocumentAttachmentAction.saveAccountOwnerDocumentAttachmentFailed(data));
    }
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountOwnerDocumentAttachmentAction.saveAccountOwnerDocumentAttachmentFailed(data));
  }
}

export function* watchSaveAccountOwnerDocumentAttachment() {
  yield takeLatest(AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT, saveAccountOwnerDocumentAttachment);
}

export function* deleteAccountOwnerDocumentAttachment(action) {
  const response = yield call(AccountOwnerDocumentAttachmentApi.deleteAccountOwnerDocumentAttachment, action.object);
  if (response === '') {
    yield put(AccountOwnerDocumentAttachmentAction.deleteAccountOwnerDocumentAttachmentSuccess(action.object));
    yield put(AccountOwnerDocumentAttachmentAction.getAccountOwnerDocumentAttachments());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountOwnerDocumentAttachmentAction.deleteAccountOwnerDocumentAttachmentFailed(data));
  }
}

export function* watchDeleteAccountOwnerDocumentAttachment() {
  yield takeLatest(AccountOwnerDocumentAttachmentAction.DELETE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT, deleteAccountOwnerDocumentAttachment);
}

export function* newAccountOwnerDocumentAttachment() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewAccountOwnerDocumentAttachment() {
  yield takeLatest(AccountOwnerDocumentAttachmentAction.NEW_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT, newAccountOwnerDocumentAttachment);
}

export const rootAccountOwnerDocumentAttachmentSaga = all([
  fork(watchGetAccountOwnerDocumentAttachments),
  fork(watchGetAccountOwnerDocumentAttachment),
  fork(watchSaveAccountOwnerDocumentAttachment),
  fork(watchDeleteAccountOwnerDocumentAttachment),
  fork(watchNewAccountOwnerDocumentAttachment),
]);
