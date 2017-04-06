import { call, put, fork, takeLatest } from 'redux-saga/effects';

import * as WorkingPeriodAction from './../actions/WorkingPeriodAction';
import * as WorkingPeriodApi from './../api/WorkingPeriodApi';

export function* getWorkingPeriods(action) {
  const response = yield call(WorkingPeriodApi.getWorkingPeriods, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(WorkingPeriodAction.getWorkingPeriodsSuccess(response));
  } else if (!response.canceled) {
    yield put(WorkingPeriodAction.getWorkingPeriodsFailed());
  }
}

export function* watchGetWorkingPeriods() {
  yield takeLatest(WorkingPeriodAction.GET_WORKING_PERIODS, getWorkingPeriods);
}

export function* getWorkingPeriod(action) {
  const response = yield call(WorkingPeriodApi.getWorkingPeriod, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(WorkingPeriodAction.getWorkingPeriodSuccess(response));
  } else if (!response.canceled) {
    yield put(WorkingPeriodAction.getWorkingPeriodFailed(action.id));
  }
}

export function* watchGetWorkingPeriod() {
  yield takeLatest(WorkingPeriodAction.GET_WORKING_PERIOD, getWorkingPeriod);
}

export function* findWorkingPeriodsByName(action) {
  const response = yield call(WorkingPeriodApi.findWorkingPeriodsByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(WorkingPeriodAction.getWorkingPeriodsSuccess(response));
  } else if (!response.canceled) {
    yield put(WorkingPeriodAction.getWorkingPeriodsFailed());
  }
}
export function* watchFindWorkingPeriodsByName() {
  yield takeLatest(WorkingPeriodAction.FIND_WORKING_PERIODS_BY_NAME, findWorkingPeriodsByName);
}

export function* findLastWorkingPeriod() {
  const response = yield call(WorkingPeriodApi.findLastWorkingPeriod);
  if (response && !response.error && !response.canceled) {
    yield put(WorkingPeriodAction.getWorkingPeriodSuccess(response));
  } else if (!response.canceled) {
    yield put(WorkingPeriodAction.getWorkingPeriodFailed());
  }
}
export function* watchFindLastWorkingPeriod() {
  yield takeLatest(WorkingPeriodAction.FIND_LAST_WORKING_PERIOD, findLastWorkingPeriod);
}

export const rootWorkingPeriodSaga = [
  fork(watchGetWorkingPeriods),
  fork(watchGetWorkingPeriod),
  fork(watchFindWorkingPeriodsByName),
  fork(watchFindLastWorkingPeriod),
];
