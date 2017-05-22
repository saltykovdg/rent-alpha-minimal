import { call, put, fork, takeLatest, all, take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as AccountRecalculationAction from './../actions/AccountRecalculationAction';
import * as AccountAction from './../actions/AccountAction';
import * as AccountRecalculationApi from './../api/AccountRecalculationApi';

export function* getAccountRecalculations(action) {
  const response = yield call(AccountRecalculationApi.getAccountRecalculations, action.accountId, action.page, action.size);
  if (response && !response.error && !response.canceled) {
    yield put(AccountRecalculationAction.getAccountRecalculationsSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountRecalculationAction.getAccountRecalculationsFailed());
  }
}
export function* watchGetAccountRecalculations() {
  yield takeLatest(AccountRecalculationAction.GET_ACCOUNT_RECALCULATIONS, getAccountRecalculations);
}

export function* addAccountRecalculation(action) {
  const response = yield call(AccountRecalculationApi.addAccountRecalculation, action.accountServiceId, action.sum, action.note);
  if (response && !response.error && !response.canceled) {
    yield put(AccountRecalculationAction.addAccountRecalculationSuccess(response));
    yield put(AccountRecalculationAction.getAccountRecalculations(action.accountId));
    if (action.workingPeriodId) {
      const sagaAction = yield take([AccountRecalculationAction.GET_ACCOUNT_RECALCULATIONS_SUCCESS, AccountRecalculationAction.GET_ACCOUNT_RECALCULATIONS_FAILED, LOCATION_CHANGE]);
      if (sagaAction.type !== LOCATION_CHANGE) {
        yield put(AccountAction.getAccountCalculations(action.accountId, action.workingPeriodId));
      }
    }
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountRecalculationAction.addAccountRecalculationFailed(data));
  }
}
export function* watchAddAccountRecalculation() {
  yield takeLatest(AccountRecalculationAction.ADD_ACCOUNT_RECALCULATION, addAccountRecalculation);
}

export function* deleteAccountRecalculation(action) {
  const response = yield call(AccountRecalculationApi.deleteAccountRecalculation, action.bundleId);
  if (response === '200') {
    yield put(AccountRecalculationAction.deleteAccountRecalculationSuccess(action.bundleId));
    yield put(AccountRecalculationAction.getAccountRecalculations(action.accountId));
    if (action.workingPeriodId) {
      const sagaAction = yield take([AccountRecalculationAction.GET_ACCOUNT_RECALCULATIONS_SUCCESS, AccountRecalculationAction.GET_ACCOUNT_RECALCULATIONS_FAILED, LOCATION_CHANGE]);
      if (sagaAction.type !== LOCATION_CHANGE) {
        yield put(AccountAction.getAccountCalculations(action.accountId, action.workingPeriodId));
      }
    }
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountRecalculationAction.deleteAccountRecalculationFailed(data));
  }
}
export function* watchDeleteAccountRecalculation() {
  yield takeLatest(AccountRecalculationAction.DELETE_ACCOUNT_RECALCULATION, deleteAccountRecalculation);
}

export const rootAccountRecalculationSaga = all([
  fork(watchGetAccountRecalculations),
  fork(watchAddAccountRecalculation),
  fork(watchDeleteAccountRecalculation),
]);
