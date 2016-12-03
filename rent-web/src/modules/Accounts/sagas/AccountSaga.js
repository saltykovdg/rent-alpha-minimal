import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as AccountAction from './../actions/AccountAction';
import * as AccountApi from './../api/AccountApi';
import * as AccountPath from './../paths/AccountPath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getAccounts(action) {
  const response = yield call(AccountApi.getAccounts, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountAction.getAccountsSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountAction.getAccountsFailed());
  }
}

export function* watchGetAccounts() {
  yield call(takeLatest, AccountAction.GET_ACCOUNTS, getAccounts);
}

export function* getAccount(action) {
  const response = yield call(AccountApi.getAccount, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(AccountAction.getAccountSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountAction.getAccountFailed(action.id));
  }
}

export function* watchGetAccount() {
  yield call(takeLatest, AccountAction.GET_ACCOUNT, getAccount);
}

export function* saveAccount(action) {
  const response = yield call(AccountApi.saveAccount, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(AccountAction.saveAccountSuccess(response));
    yield call(browserHistory.push, AccountPath.ACCOUNT_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountAction.saveAccountFailed(data));
  }
}

export function* watchSaveAccount() {
  yield call(takeLatest, AccountAction.SAVE_ACCOUNT, saveAccount);
}

export function* deleteAccount(action) {
  const response = yield call(AccountApi.deleteAccount, action.object);
  if (response === '') {
    yield put(AccountAction.deleteAccountSuccess(action.object));
    yield put(AccountAction.getAccounts());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountAction.deleteAccountFailed(data));
  }
}

export function* watchDeleteAccount() {
  yield call(takeLatest, AccountAction.DELETE_ACCOUNT, deleteAccount);
}

export function* newAccount() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewAccount() {
  yield call(takeLatest, AccountAction.NEW_ACCOUNT, newAccount);
}

export function* findAccountsByName(action) {
  const response = yield call(AccountApi.findAccountsByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(AccountAction.getAccountsSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountAction.getAccountsFailed());
  }
}

export function* watchFindAccountsByName() {
  yield call(takeLatest, AccountAction.FIND_ACCOUNTS_BY_NAME, findAccountsByName);
}

export const rootAccountSaga = [
  fork(watchGetAccounts),
  fork(watchGetAccount),
  fork(watchSaveAccount),
  fork(watchDeleteAccount),
  fork(watchNewAccount),
  fork(watchFindAccountsByName),
];
