import { call, put, fork, takeLatest, all } from 'redux-saga/effects';

import * as AccountOwnerAction from './../actions/AccountOwnerAction';
import * as AccountOwnerApi from './../api/AccountOwnerApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getAccountOwners(action) {
  const response = yield call(AccountOwnerApi.getAccountOwners, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountOwnerAction.getAccountOwnersSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountOwnerAction.getAccountOwnersFailed());
  }
}

export function* watchGetAccountOwners() {
  yield takeLatest(AccountOwnerAction.GET_ACCOUNT_OWNERS, getAccountOwners);
}

export function* getAccountOwner(action) {
  const response = yield call(AccountOwnerApi.getAccountOwner, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(AccountOwnerAction.getAccountOwnerSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountOwnerAction.getAccountOwnerFailed(action.id));
  }
}

export function* watchGetAccountOwner() {
  yield takeLatest(AccountOwnerAction.GET_ACCOUNT_OWNER, getAccountOwner);
}

export function* saveAccountOwner(action) {
  const response = yield call(AccountOwnerApi.saveAccountOwner, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(AccountOwnerAction.saveAccountOwnerSuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountOwnerAction.saveAccountOwnerFailed(data));
  }
}

export function* watchSaveAccountOwner() {
  yield takeLatest(AccountOwnerAction.SAVE_ACCOUNT_OWNER, saveAccountOwner);
}

export function* deleteAccountOwner(action) {
  const response = yield call(AccountOwnerApi.deleteAccountOwner, action.object);
  if (response === '') {
    yield put(AccountOwnerAction.deleteAccountOwnerSuccess(action.object));
    yield put(AccountOwnerAction.getAccountOwners());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountOwnerAction.deleteAccountOwnerFailed(data));
  }
}

export function* watchDeleteAccountOwner() {
  yield takeLatest(AccountOwnerAction.DELETE_ACCOUNT_OWNER, deleteAccountOwner);
}

export function* newAccountOwner() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewAccountOwner() {
  yield takeLatest(AccountOwnerAction.NEW_ACCOUNT_OWNER, newAccountOwner);
}

export const rootAccountOwnerSaga = all([
  fork(watchGetAccountOwners),
  fork(watchGetAccountOwner),
  fork(watchSaveAccountOwner),
  fork(watchDeleteAccountOwner),
  fork(watchNewAccountOwner),
]);
