import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as ParameterTypeAction from './../actions/ParameterTypeAction';
import * as ParameterTypeApi from './../api/ParameterTypeApi';
import * as ParameterTypePath from './../paths/ParameterTypePath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getParameterTypes(action) {
  const response = yield call(ParameterTypeApi.getParameterTypes, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(ParameterTypeAction.getParameterTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(ParameterTypeAction.getParameterTypesFailed());
  }
}

export function* watchGetParameterTypes() {
  yield takeLatest(ParameterTypeAction.GET_PARAMETER_TYPES, getParameterTypes);
}

export function* getParameterType(action) {
  const response = yield call(ParameterTypeApi.getParameterType, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(ParameterTypeAction.getParameterTypeSuccess(response));
  } else if (!response.canceled) {
    yield put(ParameterTypeAction.getParameterTypeFailed(action.id));
  }
}

export function* watchGetParameterType() {
  yield takeLatest(ParameterTypeAction.GET_PARAMETER_TYPE, getParameterType);
}

export function* saveParameterType(action) {
  const response = yield call(ParameterTypeApi.saveParameterType, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(ParameterTypeAction.saveParameterTypeSuccess(response));
    yield call(browserHistory.push, ParameterTypePath.PARAMETER_TYPE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(ParameterTypeAction.saveParameterTypeFailed(data));
  }
}

export function* watchSaveParameterType() {
  yield takeLatest(ParameterTypeAction.SAVE_PARAMETER_TYPE, saveParameterType);
}

export function* deleteParameterType(action) {
  const response = yield call(ParameterTypeApi.deleteParameterType, action.object);
  if (response === '') {
    yield put(ParameterTypeAction.deleteParameterTypeSuccess(action.object));
    yield put(ParameterTypeAction.getParameterTypes(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(ParameterTypeAction.deleteParameterTypeFailed(data));
  }
}

export function* watchDeleteParameterType() {
  yield takeLatest(ParameterTypeAction.DELETE_PARAMETER_TYPE, deleteParameterType);
}

export function* newParameterType() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewParameterType() {
  yield takeLatest(ParameterTypeAction.NEW_PARAMETER_TYPE, newParameterType);
}

export function* findParameterTypesByName(action) {
  const response = yield call(ParameterTypeApi.findParameterTypesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(ParameterTypeAction.getParameterTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(ParameterTypeAction.getParameterTypesFailed());
  }
}

export function* watchFindParameterTypesByName() {
  yield takeLatest(ParameterTypeAction.FIND_PARAMETER_TYPES_BY_NAME, findParameterTypesByName);
}

export const rootParameterTypeSaga = [
  fork(watchGetParameterTypes),
  fork(watchGetParameterType),
  fork(watchSaveParameterType),
  fork(watchDeleteParameterType),
  fork(watchNewParameterType),
  fork(watchFindParameterTypesByName),
];
