import { call, put, fork, takeLatest } from 'redux-saga/effects';

import * as NormValueAction from './../actions/NormValueAction';
import * as NormValueApi from './../api/NormValueApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getNormValues(action) {
  const response = yield call(NormValueApi.getNormValues, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(NormValueAction.getNormValuesSuccess(response));
  } else if (!response.canceled) {
    yield put(NormValueAction.getNormValuesFailed());
  }
}

export function* watchGetNormValues() {
  yield takeLatest(NormValueAction.GET_NORM_VALUES, getNormValues);
}

export function* getNormValue(action) {
  const response = yield call(NormValueApi.getNormValue, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(NormValueAction.getNormValueSuccess(response));
  } else if (!response.canceled) {
    yield put(NormValueAction.getNormValueFailed(action.id));
  }
}

export function* watchGetNormValue() {
  yield takeLatest(NormValueAction.GET_NORM_VALUE, getNormValue);
}

export function* saveNormValue(action) {
  const response = yield call(NormValueApi.saveNormValue, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(NormValueAction.saveNormValueSuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(NormValueAction.saveNormValueFailed(data));
  }
}

export function* watchSaveNormValue() {
  yield takeLatest(NormValueAction.SAVE_NORM_VALUE, saveNormValue);
}

export function* deleteNormValue(action) {
  const response = yield call(NormValueApi.deleteNormValue, action.object);
  if (response === '') {
    yield put(NormValueAction.deleteNormValueSuccess(action.object));
    yield put(NormValueAction.getNormValues());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(NormValueAction.deleteNormValueFailed(data));
  }
}

export function* watchDeleteNormValue() {
  yield takeLatest(NormValueAction.DELETE_NORM_VALUE, deleteNormValue);
}

export function* newNormValue() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewNormValue() {
  yield takeLatest(NormValueAction.NEW_NORM_VALUE, newNormValue);
}

export const rootNormValueSaga = [
  fork(watchGetNormValues),
  fork(watchGetNormValue),
  fork(watchSaveNormValue),
  fork(watchDeleteNormValue),
  fork(watchNewNormValue),
];
