import { call, put, fork, takeLatest } from 'redux-saga/effects';

import * as TariffValueAction from './../actions/TariffValueAction';
import * as TariffValueApi from './../api/TariffValueApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getTariffValues(action) {
  const response = yield call(TariffValueApi.getTariffValues, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(TariffValueAction.getTariffValuesSuccess(response));
  } else if (!response.canceled) {
    yield put(TariffValueAction.getTariffValuesFailed());
  }
}

export function* watchGetTariffValues() {
  yield takeLatest(TariffValueAction.GET_TARIFF_VALUES, getTariffValues);
}

export function* getTariffValue(action) {
  const response = yield call(TariffValueApi.getTariffValue, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(TariffValueAction.getTariffValueSuccess(response));
  } else if (!response.canceled) {
    yield put(TariffValueAction.getTariffValueFailed(action.id));
  }
}

export function* watchGetTariffValue() {
  yield takeLatest(TariffValueAction.GET_TARIFF_VALUE, getTariffValue);
}

export function* saveTariffValue(action) {
  const response = yield call(TariffValueApi.saveTariffValue, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(TariffValueAction.saveTariffValueSuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(TariffValueAction.saveTariffValueFailed(data));
  }
}

export function* watchSaveTariffValue() {
  yield takeLatest(TariffValueAction.SAVE_TARIFF_VALUE, saveTariffValue);
}

export function* deleteTariffValue(action) {
  const response = yield call(TariffValueApi.deleteTariffValue, action.object);
  if (response === '') {
    yield put(TariffValueAction.deleteTariffValueSuccess(action.object));
    yield put(TariffValueAction.getTariffValues());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(TariffValueAction.deleteTariffValueFailed(data));
  }
}

export function* watchDeleteTariffValue() {
  yield takeLatest(TariffValueAction.DELETE_TARIFF_VALUE, deleteTariffValue);
}

export function* newTariffValue() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewTariffValue() {
  yield takeLatest(TariffValueAction.NEW_TARIFF_VALUE, newTariffValue);
}

export const rootTariffValueSaga = [
  fork(watchGetTariffValues),
  fork(watchGetTariffValue),
  fork(watchSaveTariffValue),
  fork(watchDeleteTariffValue),
  fork(watchNewTariffValue),
];
