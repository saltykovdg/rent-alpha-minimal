import { call, put, fork, takeLatest } from 'redux-saga/effects';

import * as MeterValueAction from './../actions/MeterValueAction';
import * as MeterValueApi from './../api/MeterValueApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getMeterValues(action) {
  const response = yield call(MeterValueApi.getMeterValues, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(MeterValueAction.getMeterValuesSuccess(response));
  } else if (!response.canceled) {
    yield put(MeterValueAction.getMeterValuesFailed());
  }
}

export function* watchGetMeterValues() {
  yield takeLatest(MeterValueAction.GET_METER_VALUES, getMeterValues);
}

export function* getMeterValue(action) {
  const response = yield call(MeterValueApi.getMeterValue, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(MeterValueAction.getMeterValueSuccess(response));
  } else if (!response.canceled) {
    yield put(MeterValueAction.getMeterValueFailed(action.id));
  }
}

export function* watchGetMeterValue() {
  yield takeLatest(MeterValueAction.GET_METER_VALUE, getMeterValue);
}

export function* saveMeterValue(action) {
  const response = yield call(MeterValueApi.saveMeterValue, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(MeterValueAction.saveMeterValueSuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(MeterValueAction.saveMeterValueFailed(data));
  }
}

export function* watchSaveMeterValue() {
  yield takeLatest(MeterValueAction.SAVE_METER_VALUE, saveMeterValue);
}

export function* deleteMeterValue(action) {
  const response = yield call(MeterValueApi.deleteMeterValue, action.object);
  if (response === '') {
    yield put(MeterValueAction.deleteMeterValueSuccess(action.object));
    yield put(MeterValueAction.getMeterValues());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(MeterValueAction.deleteMeterValueFailed(data));
  }
}

export function* watchDeleteMeterValue() {
  yield takeLatest(MeterValueAction.DELETE_METER_VALUE, deleteMeterValue);
}

export function* newMeterValue() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewMeterValue() {
  yield takeLatest(MeterValueAction.NEW_METER_VALUE, newMeterValue);
}

export const rootMeterValueSaga = [
  fork(watchGetMeterValues),
  fork(watchGetMeterValue),
  fork(watchSaveMeterValue),
  fork(watchDeleteMeterValue),
  fork(watchNewMeterValue),
];
