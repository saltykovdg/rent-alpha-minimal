import { call, put, fork, takeLatest } from 'redux-saga/effects';

import * as WorkingPeriodAction from './../actions/WorkingPeriodAction';
import * as WorkingPeriodApi from './../api/WorkingPeriodApi';
import * as ApiCaller from '../../../util/ApiCaller';

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

export function* saveWorkingPeriod(action) {
  const response = yield call(WorkingPeriodApi.saveWorkingPeriod, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(WorkingPeriodAction.saveWorkingPeriodSuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(WorkingPeriodAction.saveWorkingPeriodFailed(data));
  }
}

export function* watchSaveWorkingPeriod() {
  yield takeLatest(WorkingPeriodAction.SAVE_WORKING_PERIOD, saveWorkingPeriod);
}

export function* deleteWorkingPeriod(action) {
  const response = yield call(WorkingPeriodApi.deleteWorkingPeriod, action.object);
  if (response === '') {
    yield put(WorkingPeriodAction.deleteWorkingPeriodSuccess(action.object));
    yield put(WorkingPeriodAction.getWorkingPeriods(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(WorkingPeriodAction.deleteWorkingPeriodFailed(data));
  }
}

export function* watchDeleteWorkingPeriod() {
  yield takeLatest(WorkingPeriodAction.DELETE_WORKING_PERIOD, deleteWorkingPeriod);
}

export function* newWorkingPeriod() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewWorkingPeriod() {
  yield takeLatest(WorkingPeriodAction.NEW_WORKING_PERIOD, newWorkingPeriod);
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
  fork(watchSaveWorkingPeriod),
  fork(watchDeleteWorkingPeriod),
  fork(watchNewWorkingPeriod),
  fork(watchFindWorkingPeriodsByName),
  fork(watchFindLastWorkingPeriod),
];
