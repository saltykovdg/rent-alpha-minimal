import { call, put, fork, takeLatest, all } from 'redux-saga/effects';

import * as AccountParameterAction from './../actions/AccountParameterAction';
import * as AccountParameterApi from './../api/AccountParameterApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getAccountParameters(action) {
  const response = yield call(AccountParameterApi.getAccountParameters, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountParameterAction.getAccountParametersSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountParameterAction.getAccountParametersFailed());
  }
}

export function* watchGetAccountParameters() {
  yield takeLatest(AccountParameterAction.GET_ACCOUNT_PARAMETERS, getAccountParameters);
}

export function* getAccountParameter(action) {
  const response = yield call(AccountParameterApi.getAccountParameter, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(AccountParameterAction.getAccountParameterSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountParameterAction.getAccountParameterFailed(action.id));
  }
}

export function* watchGetAccountParameter() {
  yield takeLatest(AccountParameterAction.GET_ACCOUNT_PARAMETER, getAccountParameter);
}

export function* saveAccountParameter(action) {
  const response = yield call(AccountParameterApi.saveAccountParameter, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(AccountParameterAction.saveAccountParameterSuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountParameterAction.saveAccountParameterFailed(data));
  }
}

export function* watchSaveAccountParameter() {
  yield takeLatest(AccountParameterAction.SAVE_ACCOUNT_PARAMETER, saveAccountParameter);
}

export function* deleteAccountParameter(action) {
  const response = yield call(AccountParameterApi.deleteAccountParameter, action.object);
  if (response === '') {
    yield put(AccountParameterAction.deleteAccountParameterSuccess(action.object));
    yield put(AccountParameterAction.getAccountParameters());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountParameterAction.deleteAccountParameterFailed(data));
  }
}

export function* watchDeleteAccountParameter() {
  yield takeLatest(AccountParameterAction.DELETE_ACCOUNT_PARAMETER, deleteAccountParameter);
}

export function* newAccountParameter() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewAccountParameter() {
  yield takeLatest(AccountParameterAction.NEW_ACCOUNT_PARAMETER, newAccountParameter);
}

export const rootAccountParameterSaga = all([
  fork(watchGetAccountParameters),
  fork(watchGetAccountParameter),
  fork(watchSaveAccountParameter),
  fork(watchDeleteAccountParameter),
  fork(watchNewAccountParameter),
]);
