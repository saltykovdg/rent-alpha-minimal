import { call, put, fork, takeLatest, all } from 'redux-saga/effects';

import * as AccountRegisteredAction from './../actions/AccountRegisteredAction';
import * as AccountRegisteredApi from './../api/AccountRegisteredApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getAccountRegistereds(action) {
  const response = yield call(AccountRegisteredApi.getAccountRegistereds, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountRegisteredAction.getAccountRegisteredsSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountRegisteredAction.getAccountRegisteredsFailed());
  }
}

export function* watchGetAccountRegistereds() {
  yield takeLatest(AccountRegisteredAction.GET_ACCOUNT_REGISTEREDS, getAccountRegistereds);
}

export function* getAccountRegistered(action) {
  const response = yield call(AccountRegisteredApi.getAccountRegistered, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(AccountRegisteredAction.getAccountRegisteredSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountRegisteredAction.getAccountRegisteredFailed(action.id));
  }
}

export function* watchGetAccountRegistered() {
  yield takeLatest(AccountRegisteredAction.GET_ACCOUNT_REGISTERED, getAccountRegistered);
}

export function* saveAccountRegistered(action) {
  const response = yield call(AccountRegisteredApi.saveAccountRegistered, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(AccountRegisteredAction.saveAccountRegisteredSuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountRegisteredAction.saveAccountRegisteredFailed(data));
  }
}

export function* watchSaveAccountRegistered() {
  yield takeLatest(AccountRegisteredAction.SAVE_ACCOUNT_REGISTERED, saveAccountRegistered);
}

export function* deleteAccountRegistered(action) {
  const response = yield call(AccountRegisteredApi.deleteAccountRegistered, action.object);
  if (response === '') {
    yield put(AccountRegisteredAction.deleteAccountRegisteredSuccess(action.object));
    yield put(AccountRegisteredAction.getAccountRegistereds());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountRegisteredAction.deleteAccountRegisteredFailed(data));
  }
}

export function* watchDeleteAccountRegistered() {
  yield takeLatest(AccountRegisteredAction.DELETE_ACCOUNT_REGISTERED, deleteAccountRegistered);
}

export function* newAccountRegistered() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewAccountRegistered() {
  yield takeLatest(AccountRegisteredAction.NEW_ACCOUNT_REGISTERED, newAccountRegistered);
}

export const rootAccountRegisteredSaga = all([
  fork(watchGetAccountRegistereds),
  fork(watchGetAccountRegistered),
  fork(watchSaveAccountRegistered),
  fork(watchDeleteAccountRegistered),
  fork(watchNewAccountRegistered),
]);
