import { call, put, fork, takeLatest, all } from 'redux-saga/effects';

import * as SystemPropertyAction from './../actions/SystemPropertyAction';
import * as SystemPropertyApi from './../api/SystemPropertyApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getSystemProperties(action) {
  const response = yield call(SystemPropertyApi.getSystemProperties, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(SystemPropertyAction.getSystemPropertiesSuccess(response));
  } else if (!response.canceled) {
    yield put(SystemPropertyAction.getSystemPropertiesFailed());
  }
}

export function* watchGetSystemProperties() {
  yield takeLatest(SystemPropertyAction.GET_SYSTEM_PROPERTIES, getSystemProperties);
}

export function* getSystemProperty(action) {
  const response = yield call(SystemPropertyApi.getSystemProperty, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(SystemPropertyAction.getSystemPropertySuccess(response));
  } else if (!response.canceled) {
    yield put(SystemPropertyAction.getSystemPropertyFailed(action.id));
  }
}

export function* watchGetSystemProperty() {
  yield takeLatest(SystemPropertyAction.GET_SYSTEM_PROPERTY, getSystemProperty);
}

export function* saveSystemProperty(action) {
  const response = yield call(SystemPropertyApi.saveSystemProperty, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(SystemPropertyAction.saveSystemPropertySuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(SystemPropertyAction.saveSystemPropertyFailed(data));
  }
}

export function* watchSaveSystemProperty() {
  yield takeLatest(SystemPropertyAction.SAVE_SYSTEM_PROPERTY, saveSystemProperty);
}

export function* deleteSystemProperty(action) {
  const response = yield call(SystemPropertyApi.deleteSystemProperty, action.object);
  if (response === '') {
    yield put(SystemPropertyAction.deleteSystemPropertySuccess(action.object));
    yield put(SystemPropertyAction.getSystemPropertys(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(SystemPropertyAction.deleteSystemPropertyFailed(data));
  }
}

export function* watchDeleteSystemProperty() {
  yield takeLatest(SystemPropertyAction.DELETE_SYSTEM_PROPERTY, deleteSystemProperty);
}

export function* newSystemProperty() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewSystemProperty() {
  yield takeLatest(SystemPropertyAction.NEW_SYSTEM_PROPERTY, newSystemProperty);
}

export function* findSystemPropertiesByName(action) {
  const response = yield call(SystemPropertyApi.findSystemPropertiesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(SystemPropertyAction.getSystemPropertiesSuccess(response));
  } else if (!response.canceled) {
    yield put(SystemPropertyAction.getSystemPropertiesFailed());
  }
}

export function* watchFindSystemPropertiesByName() {
  yield takeLatest(SystemPropertyAction.FIND_SYSTEM_PROPERTIES_BY_NAME, findSystemPropertiesByName);
}

export const rootSystemPropertySaga = all([
  fork(watchGetSystemProperties),
  fork(watchGetSystemProperty),
  fork(watchSaveSystemProperty),
  fork(watchDeleteSystemProperty),
  fork(watchNewSystemProperty),
  fork(watchFindSystemPropertiesByName),
]);
