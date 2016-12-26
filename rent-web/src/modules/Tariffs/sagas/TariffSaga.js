import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as TariffAction from './../actions/TariffAction';
import * as TariffApi from './../api/TariffApi';
import * as TariffPath from './../paths/TariffPath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getTariffs(action) {
  const response = yield call(TariffApi.getTariffs, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(TariffAction.getTariffsSuccess(response));
  } else if (!response.canceled) {
    yield put(TariffAction.getTariffsFailed());
  }
}

export function* watchGetTariffs() {
  yield takeLatest(TariffAction.GET_TARIFFS, getTariffs);
}

export function* getTariff(action) {
  const response = yield call(TariffApi.getTariff, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(TariffAction.getTariffSuccess(response));
  } else if (!response.canceled) {
    yield put(TariffAction.getTariffFailed(action.id));
  }
}

export function* watchGetTariff() {
  yield takeLatest(TariffAction.GET_TARIFF, getTariff);
}

export function* saveTariff(action) {
  const response = yield call(TariffApi.saveTariff, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(TariffAction.saveTariffSuccess(response));
    yield call(browserHistory.push, TariffPath.TARIFF_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(TariffAction.saveTariffFailed(data));
  }
}

export function* watchSaveTariff() {
  yield takeLatest(TariffAction.SAVE_TARIFF, saveTariff);
}

export function* deleteTariff(action) {
  const response = yield call(TariffApi.deleteTariff, action.object);
  if (response === '') {
    yield put(TariffAction.deleteTariffSuccess(action.object));
    yield put(TariffAction.getTariffs());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(TariffAction.deleteTariffFailed(data));
  }
}

export function* watchDeleteTariff() {
  yield takeLatest(TariffAction.DELETE_TARIFF, deleteTariff);
}

export function* newTariff() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewTariff() {
  yield takeLatest(TariffAction.NEW_TARIFF, newTariff);
}

export function* findTariffsByName(action) {
  const response = yield call(TariffApi.findTariffsByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(TariffAction.getTariffsSuccess(response));
  } else if (!response.canceled) {
    yield put(TariffAction.getTariffsFailed());
  }
}

export function* watchFindTariffsByName() {
  yield takeLatest(TariffAction.FIND_TARIFFS_BY_NAME, findTariffsByName);
}

export const rootTariffSaga = [
  fork(watchGetTariffs),
  fork(watchGetTariff),
  fork(watchSaveTariff),
  fork(watchDeleteTariff),
  fork(watchNewTariff),
  fork(watchFindTariffsByName),
];
