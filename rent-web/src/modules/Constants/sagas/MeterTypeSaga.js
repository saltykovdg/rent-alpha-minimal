import { call, put, fork, takeLatest, all } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as MeterTypeAction from './../actions/MeterTypeAction';
import * as MeterTypeApi from './../api/MeterTypeApi';
import * as MeterTypePath from './../paths/MeterTypePath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getMeterTypes(action) {
  const response = yield call(MeterTypeApi.getMeterTypes, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(MeterTypeAction.getMeterTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(MeterTypeAction.getMeterTypesFailed());
  }
}

export function* watchGetMeterTypes() {
  yield takeLatest(MeterTypeAction.GET_METER_TYPES, getMeterTypes);
}

export function* getMeterType(action) {
  const response = yield call(MeterTypeApi.getMeterType, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(MeterTypeAction.getMeterTypeSuccess(response));
  } else if (!response.canceled) {
    yield put(MeterTypeAction.getMeterTypeFailed(action.id));
  }
}

export function* watchGetMeterType() {
  yield takeLatest(MeterTypeAction.GET_METER_TYPE, getMeterType);
}

export function* saveMeterType(action) {
  const response = yield call(MeterTypeApi.saveMeterType, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(MeterTypeAction.saveMeterTypeSuccess(response));
    yield call(browserHistory.push, MeterTypePath.METER_TYPE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(MeterTypeAction.saveMeterTypeFailed(data));
  }
}

export function* watchSaveMeterType() {
  yield takeLatest(MeterTypeAction.SAVE_METER_TYPE, saveMeterType);
}

export function* deleteMeterType(action) {
  const response = yield call(MeterTypeApi.deleteMeterType, action.object);
  if (response === '') {
    yield put(MeterTypeAction.deleteMeterTypeSuccess(action.object));
    yield put(MeterTypeAction.getMeterTypes(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(MeterTypeAction.deleteMeterTypeFailed(data));
  }
}

export function* watchDeleteMeterType() {
  yield takeLatest(MeterTypeAction.DELETE_METER_TYPE, deleteMeterType);
}

export function* newMeterType() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewMeterType() {
  yield takeLatest(MeterTypeAction.NEW_METER_TYPE, newMeterType);
}

export function* findMeterTypesByName(action) {
  const response = yield call(MeterTypeApi.findMeterTypesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(MeterTypeAction.getMeterTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(MeterTypeAction.getMeterTypesFailed());
  }
}

export function* watchFindMeterTypesByName() {
  yield takeLatest(MeterTypeAction.FIND_METER_TYPES_BY_NAME, findMeterTypesByName);
}

export const rootMeterTypeSaga = all([
  fork(watchGetMeterTypes),
  fork(watchGetMeterType),
  fork(watchSaveMeterType),
  fork(watchDeleteMeterType),
  fork(watchNewMeterType),
  fork(watchFindMeterTypesByName),
]);
