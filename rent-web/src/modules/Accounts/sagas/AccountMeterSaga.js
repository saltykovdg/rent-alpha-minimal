import { call, put, fork, takeLatest, all } from 'redux-saga/effects';

import * as AccountMeterAction from './../actions/AccountMeterAction';
import * as AccountMeterApi from './../api/AccountMeterApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getAccountMeters(action) {
  const response = yield call(AccountMeterApi.getAccountMeters, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountMeterAction.getAccountMetersSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountMeterAction.getAccountMetersFailed());
  }
}

export function* watchGetAccountMeters() {
  yield takeLatest(AccountMeterAction.GET_ACCOUNT_METERS, getAccountMeters);
}

export function* getAccountMeter(action) {
  const response = yield call(AccountMeterApi.getAccountMeter, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(AccountMeterAction.getAccountMeterSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountMeterAction.getAccountMeterFailed(action.id));
  }
}

export function* watchGetAccountMeter() {
  yield takeLatest(AccountMeterAction.GET_ACCOUNT_METER, getAccountMeter);
}

export function* saveAccountMeter(action) {
  const response = yield call(AccountMeterApi.saveAccountMeter, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(AccountMeterAction.saveAccountMeterSuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountMeterAction.saveAccountMeterFailed(data));
  }
}

export function* watchSaveAccountMeter() {
  yield takeLatest(AccountMeterAction.SAVE_ACCOUNT_METER, saveAccountMeter);
}

export function* deleteAccountMeter(action) {
  const response = yield call(AccountMeterApi.deleteAccountMeter, action.object);
  if (response === '') {
    yield put(AccountMeterAction.deleteAccountMeterSuccess(action.object));
    yield put(AccountMeterAction.getAccountMeters());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountMeterAction.deleteAccountMeterFailed(data));
  }
}

export function* watchDeleteAccountMeter() {
  yield takeLatest(AccountMeterAction.DELETE_ACCOUNT_METER, deleteAccountMeter);
}

export function* newAccountMeter() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewAccountMeter() {
  yield takeLatest(AccountMeterAction.NEW_ACCOUNT_METER, newAccountMeter);
}

export const rootAccountMeterSaga = all([
  fork(watchGetAccountMeters),
  fork(watchGetAccountMeter),
  fork(watchSaveAccountMeter),
  fork(watchDeleteAccountMeter),
  fork(watchNewAccountMeter),
]);
