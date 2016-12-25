import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

import * as AccountServiceAction from './../actions/AccountServiceAction';
import * as AccountServiceApi from './../api/AccountServiceApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getAccountServices(action) {
  const response = yield call(AccountServiceApi.getAccountServices, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountServiceAction.getAccountServicesSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountServiceAction.getAccountServicesFailed());
  }
}

export function* watchGetAccountServices() {
  yield takeLatest(AccountServiceAction.GET_ACCOUNT_SERVICES, getAccountServices);
}

export function* getAccountService(action) {
  const response = yield call(AccountServiceApi.getAccountService, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(AccountServiceAction.getAccountServiceSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountServiceAction.getAccountServiceFailed(action.id));
  }
}

export function* watchGetAccountService() {
  yield takeLatest(AccountServiceAction.GET_ACCOUNT_SERVICE, getAccountService);
}

export function* saveAccountService(action) {
  const response = yield call(AccountServiceApi.saveAccountService, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(AccountServiceAction.saveAccountServiceSuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountServiceAction.saveAccountServiceFailed(data));
  }
}

export function* watchSaveAccountService() {
  yield takeLatest(AccountServiceAction.SAVE_ACCOUNT_SERVICE, saveAccountService);
}

export function* deleteAccountService(action) {
  const response = yield call(AccountServiceApi.deleteAccountService, action.object);
  if (response === '') {
    yield put(AccountServiceAction.deleteAccountServiceSuccess(action.object));
    yield put(AccountServiceAction.getAccountServices());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountServiceAction.deleteAccountServiceFailed(data));
  }
}

export function* watchDeleteAccountService() {
  yield takeLatest(AccountServiceAction.DELETE_ACCOUNT_SERVICE, deleteAccountService);
}

export function* newAccountService() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewAccountService() {
  yield takeLatest(AccountServiceAction.NEW_ACCOUNT_SERVICE, newAccountService);
}

export const rootAccountServiceSaga = [
  fork(watchGetAccountServices),
  fork(watchGetAccountService),
  fork(watchSaveAccountService),
  fork(watchDeleteAccountService),
  fork(watchNewAccountService),
];
