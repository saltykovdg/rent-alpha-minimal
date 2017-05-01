import { call, put, fork, takeLatest } from 'redux-saga/effects';

import * as CalculationAction from './../actions/CalculationAction';
import * as SystemPropertyAction from './../actions//SystemPropertyAction';
import * as CalculationApi from './../api/CalculationApi';

export function* calculateAccounts(action) {
  const response = yield call(CalculationApi.calculateAccounts, action.periodStartId, action.periodEndId);
  if (response && !response.error && !response.canceled) {
    yield put(CalculationAction.calculateAccountsSuccess(response));
    yield put(SystemPropertyAction.findSystemPropertiesByName());
  } else if (!response.canceled) {
    yield put(CalculationAction.calculateAccountsFailed());
  }
}
export function* watchCalculateAccounts() {
  yield takeLatest(CalculationAction.CALCULATE_ACCOUNTS, calculateAccounts);
}

export function* closeWorkingPeriod() {
  const response = yield call(CalculationApi.closeWorkingPeriod);
  if (response && !response.error && !response.canceled) {
    yield put(CalculationAction.closeWorkingPeriodSuccess(response));
    yield put(SystemPropertyAction.findSystemPropertiesByName());
  } else if (!response.canceled) {
    yield put(CalculationAction.closeWorkingPeriodFailed());
  }
}
export function* watchCloseWorkingPeriod() {
  yield takeLatest(CalculationAction.CLOSE_WORKING_PERIOD, closeWorkingPeriod);
}

export const rootCalculationSaga = [
  fork(watchCalculateAccounts),
  fork(watchCloseWorkingPeriod),
];