import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as ServiceTypeAction from './../actions/ServiceTypeAction';
import * as ServiceTypeApi from './../api/ServiceTypeApi';
import * as ServiceTypePath from './../paths/ServiceTypePath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getServiceTypes(action) {
  const response = yield call(ServiceTypeApi.getServiceTypes, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceTypeAction.getServiceTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(ServiceTypeAction.getServiceTypesFailed());
  }
}

export function* watchGetServiceTypes() {
  yield takeLatest(ServiceTypeAction.GET_SERVICE_TYPES, getServiceTypes);
}

export function* getServiceType(action) {
  const response = yield call(ServiceTypeApi.getServiceType, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceTypeAction.getServiceTypeSuccess(response));
  } else if (!response.canceled) {
    yield put(ServiceTypeAction.getServiceTypeFailed(action.id));
  }
}

export function* watchGetServiceType() {
  yield takeLatest(ServiceTypeAction.GET_SERVICE_TYPE, getServiceType);
}

export function* saveServiceType(action) {
  const response = yield call(ServiceTypeApi.saveServiceType, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceTypeAction.saveServiceTypeSuccess(response));
    yield call(browserHistory.push, ServiceTypePath.SERVICE_TYPE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(ServiceTypeAction.saveServiceTypeFailed(data));
  }
}

export function* watchSaveServiceType() {
  yield takeLatest(ServiceTypeAction.SAVE_SERVICE_TYPE, saveServiceType);
}

export function* deleteServiceType(action) {
  const response = yield call(ServiceTypeApi.deleteServiceType, action.object);
  if (response === '') {
    yield put(ServiceTypeAction.deleteServiceTypeSuccess(action.object));
    yield put(ServiceTypeAction.getServiceTypes(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(ServiceTypeAction.deleteServiceTypeFailed(data));
  }
}

export function* watchDeleteServiceType() {
  yield takeLatest(ServiceTypeAction.DELETE_SERVICE_TYPE, deleteServiceType);
}

export function* newServiceType() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewServiceType() {
  yield takeLatest(ServiceTypeAction.NEW_SERVICE_TYPE, newServiceType);
}

export function* findServiceTypesByName(action) {
  const response = yield call(ServiceTypeApi.findServiceTypesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceTypeAction.getServiceTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(ServiceTypeAction.getServiceTypesFailed());
  }
}

export function* watchFindServiceTypesByName() {
  yield takeLatest(ServiceTypeAction.FIND_SERVICE_TYPES_BY_NAME, findServiceTypesByName);
}

export const rootServiceTypeSaga = [
  fork(watchGetServiceTypes),
  fork(watchGetServiceType),
  fork(watchSaveServiceType),
  fork(watchDeleteServiceType),
  fork(watchNewServiceType),
  fork(watchFindServiceTypesByName),
];
