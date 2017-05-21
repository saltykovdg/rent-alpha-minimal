import { call, put, fork, takeLatest, all } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as RecalculationTypeAction from './../actions/RecalculationTypeAction';
import * as RecalculationTypeApi from './../api/RecalculationTypeApi';
import * as RecalculationTypePath from './../paths/RecalculationTypePath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getRecalculationTypes(action) {
  const response = yield call(RecalculationTypeApi.getRecalculationTypes, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(RecalculationTypeAction.getRecalculationTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(RecalculationTypeAction.getRecalculationTypesFailed());
  }
}

export function* watchGetRecalculationTypes() {
  yield takeLatest(RecalculationTypeAction.GET_RECALCULATION_TYPES, getRecalculationTypes);
}

export function* getRecalculationType(action) {
  const response = yield call(RecalculationTypeApi.getRecalculationType, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(RecalculationTypeAction.getRecalculationTypeSuccess(response));
  } else if (!response.canceled) {
    yield put(RecalculationTypeAction.getRecalculationTypeFailed(action.id));
  }
}

export function* watchGetRecalculationType() {
  yield takeLatest(RecalculationTypeAction.GET_RECALCULATION_TYPE, getRecalculationType);
}

export function* saveRecalculationType(action) {
  const response = yield call(RecalculationTypeApi.saveRecalculationType, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(RecalculationTypeAction.saveRecalculationTypeSuccess(response));
    yield call(browserHistory.push, RecalculationTypePath.RECALCULATION_TYPE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(RecalculationTypeAction.saveRecalculationTypeFailed(data));
  }
}

export function* watchSaveRecalculationType() {
  yield takeLatest(RecalculationTypeAction.SAVE_RECALCULATION_TYPE, saveRecalculationType);
}

export function* deleteRecalculationType(action) {
  const response = yield call(RecalculationTypeApi.deleteRecalculationType, action.object);
  if (response === '') {
    yield put(RecalculationTypeAction.deleteRecalculationTypeSuccess(action.object));
    yield put(RecalculationTypeAction.getRecalculationTypes(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(RecalculationTypeAction.deleteRecalculationTypeFailed(data));
  }
}

export function* watchDeleteRecalculationType() {
  yield takeLatest(RecalculationTypeAction.DELETE_RECALCULATION_TYPE, deleteRecalculationType);
}

export function* newRecalculationType() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewRecalculationType() {
  yield takeLatest(RecalculationTypeAction.NEW_RECALCULATION_TYPE, newRecalculationType);
}

export function* findRecalculationTypesByName(action) {
  const response = yield call(RecalculationTypeApi.findRecalculationTypesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(RecalculationTypeAction.getRecalculationTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(RecalculationTypeAction.getRecalculationTypesFailed());
  }
}

export function* watchFindRecalculationTypesByName() {
  yield takeLatest(RecalculationTypeAction.FIND_RECALCULATION_TYPES_BY_NAME, findRecalculationTypesByName);
}

export const rootRecalculationTypeSaga = all([
  fork(watchGetRecalculationTypes),
  fork(watchGetRecalculationType),
  fork(watchSaveRecalculationType),
  fork(watchDeleteRecalculationType),
  fork(watchNewRecalculationType),
  fork(watchFindRecalculationTypesByName),
]);
