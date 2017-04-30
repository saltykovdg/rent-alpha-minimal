import { call, put, fork, takeLatest } from 'redux-saga/effects';

import * as CalculationAction from './../actions/CalculationAction';
import * as CalculationApi from './../api/CalculationApi';

export function* calculateAccounts(action) {
  const response = yield call(CalculationApi.calculateAccounts, action.periodStartId, action.periodEndId);
  if (response && !response.error && !response.canceled) {
    yield put(CalculationAction.calculateAccountsSuccess(response));
  } else if (!response.canceled) {
    yield put(CalculationAction.calculateAccountsFailed());
  }
}

export function* watchCalculateAccounts() {
  yield takeLatest(CalculationAction.CALCULATE_ACCOUNTS, calculateAccounts);
}

export const rootCalculationSaga = [
  fork(watchCalculateAccounts),
];
