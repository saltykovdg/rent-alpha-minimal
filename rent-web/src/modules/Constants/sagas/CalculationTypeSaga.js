import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as CalculationTypeAction from './../actions/CalculationTypeAction';
import * as CalculationTypeApi from './../api/CalculationTypeApi';
import * as CalculationTypePath from './../paths/CalculationTypePath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getCalculationTypes(action) {
  const response = yield call(CalculationTypeApi.getCalculationTypes, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(CalculationTypeAction.getCalculationTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(CalculationTypeAction.getCalculationTypesFailed());
  }
}

export function* watchGetCalculationTypes() {
  yield takeLatest(CalculationTypeAction.GET_CALCULATION_TYPES, getCalculationTypes);
}

export function* getCalculationType(action) {
  const response = yield call(CalculationTypeApi.getCalculationType, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(CalculationTypeAction.getCalculationTypeSuccess(response));
  } else if (!response.canceled) {
    yield put(CalculationTypeAction.getCalculationTypeFailed(action.id));
    yield call(browserHistory.push, CalculationTypePath.CALCULATION_TYPE_LIST);
  }
}

export function* watchGetCalculationType() {
  yield takeLatest(CalculationTypeAction.GET_CALCULATION_TYPE, getCalculationType);
}

export function* saveCalculationType(action) {
  const response = yield call(CalculationTypeApi.saveCalculationType, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(CalculationTypeAction.saveCalculationTypeSuccess(response));
    yield call(browserHistory.push, CalculationTypePath.CALCULATION_TYPE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(CalculationTypeAction.saveCalculationTypeFailed(data));
  }
}

export function* watchSaveCalculationType() {
  yield takeLatest(CalculationTypeAction.SAVE_CALCULATION_TYPE, saveCalculationType);
}

export function* deleteCalculationType(action) {
  const response = yield call(CalculationTypeApi.deleteCalculationType, action.object);
  if (response === '') {
    yield put(CalculationTypeAction.deleteCalculationTypeSuccess(action.object));
    yield put(CalculationTypeAction.getCalculationTypes());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(CalculationTypeAction.deleteCalculationTypeFailed(data));
  }
}

export function* watchDeleteCalculationType() {
  yield takeLatest(CalculationTypeAction.DELETE_CALCULATION_TYPE, deleteCalculationType);
}

export function* newCalculationType() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewCalculationType() {
  yield takeLatest(CalculationTypeAction.NEW_CALCULATION_TYPE, newCalculationType);
}

export function* findCalculationTypesByName(action) {
  const response = yield call(CalculationTypeApi.findCalculationTypesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(CalculationTypeAction.getCalculationTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(CalculationTypeAction.getCalculationTypesFailed());
  }
}

export function* watchFindCalculationTypesByName() {
  yield takeLatest(CalculationTypeAction.FIND_CALCULATION_TYPES_BY_NAME, findCalculationTypesByName);
}

export const rootCalculationTypeSaga = [
  fork(watchGetCalculationTypes),
  fork(watchGetCalculationType),
  fork(watchSaveCalculationType),
  fork(watchDeleteCalculationType),
  fork(watchNewCalculationType),
  fork(watchFindCalculationTypesByName),
];
