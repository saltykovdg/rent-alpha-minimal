import { call, put, fork, takeLatest, all } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as MeasurementUnitAction from './../actions/MeasurementUnitAction';
import * as MeasurementUnitApi from './../api/MeasurementUnitApi';
import * as MeasurementUnitPath from './../paths/MeasurementUnitPath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getMeasurementUnits(action) {
  const response = yield call(MeasurementUnitApi.getMeasurementUnits, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(MeasurementUnitAction.getMeasurementUnitsSuccess(response));
  } else if (!response.canceled) {
    yield put(MeasurementUnitAction.getMeasurementUnitsFailed());
  }
}

export function* watchGetMeasurementUnits() {
  yield takeLatest(MeasurementUnitAction.GET_MEASUREMENT_UNITS, getMeasurementUnits);
}

export function* getMeasurementUnit(action) {
  const response = yield call(MeasurementUnitApi.getMeasurementUnit, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(MeasurementUnitAction.getMeasurementUnitSuccess(response));
  } else if (!response.canceled) {
    yield put(MeasurementUnitAction.getMeasurementUnitFailed(action.id));
  }
}

export function* watchGetMeasurementUnit() {
  yield takeLatest(MeasurementUnitAction.GET_MEASUREMENT_UNIT, getMeasurementUnit);
}

export function* saveMeasurementUnit(action) {
  const response = yield call(MeasurementUnitApi.saveMeasurementUnit, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(MeasurementUnitAction.saveMeasurementUnitSuccess(response));
    yield call(browserHistory.push, MeasurementUnitPath.MEASUREMENT_UNIT_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(MeasurementUnitAction.saveMeasurementUnitFailed(data));
  }
}

export function* watchSaveMeasurementUnit() {
  yield takeLatest(MeasurementUnitAction.SAVE_MEASUREMENT_UNIT, saveMeasurementUnit);
}

export function* deleteMeasurementUnit(action) {
  const response = yield call(MeasurementUnitApi.deleteMeasurementUnit, action.object);
  if (response === '') {
    yield put(MeasurementUnitAction.deleteMeasurementUnitSuccess(action.object));
    yield put(MeasurementUnitAction.getMeasurementUnits(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(MeasurementUnitAction.deleteMeasurementUnitFailed(data));
  }
}

export function* watchDeleteMeasurementUnit() {
  yield takeLatest(MeasurementUnitAction.DELETE_MEASUREMENT_UNIT, deleteMeasurementUnit);
}

export function* newMeasurementUnit() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewMeasurementUnit() {
  yield takeLatest(MeasurementUnitAction.NEW_MEASUREMENT_UNIT, newMeasurementUnit);
}

export function* findMeasurementUnitsByName(action) {
  const response = yield call(MeasurementUnitApi.findMeasurementUnitsByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(MeasurementUnitAction.getMeasurementUnitsSuccess(response));
  } else if (!response.canceled) {
    yield put(MeasurementUnitAction.getMeasurementUnitsFailed());
  }
}

export function* watchFindMeasurementUnitsByName() {
  yield takeLatest(MeasurementUnitAction.FIND_MEASUREMENT_UNITS_BY_NAME, findMeasurementUnitsByName);
}

export const rootMeasurementUnitSaga = all([
  fork(watchGetMeasurementUnits),
  fork(watchGetMeasurementUnit),
  fork(watchSaveMeasurementUnit),
  fork(watchDeleteMeasurementUnit),
  fork(watchNewMeasurementUnit),
  fork(watchFindMeasurementUnitsByName),
]);
