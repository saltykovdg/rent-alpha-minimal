import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as ServiceAction from './../actions/ServiceAction';
import * as ServiceApi from './../api/ServiceApi';
import * as ServicePath from './../paths/ServicePath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getServices(action) {
  const response = yield call(ServiceApi.getServices, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceAction.getServicesSuccess(response));
  } else if (!response.canceled) {
    yield put(ServiceAction.getServicesFailed());
  }
}

export function* watchGetServices() {
  yield call(takeLatest, ServiceAction.GET_SERVICES, getServices);
}

export function* getService(action) {
  const response = yield call(ServiceApi.getService, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceAction.getServiceSuccess(response));
  } else if (!response.canceled) {
    yield put(ServiceAction.getServiceFailed(action.id));
  }
}

export function* watchGetService() {
  yield call(takeLatest, ServiceAction.GET_SERVICE, getService);
}

export function* saveService(action) {
  const response = yield call(ServiceApi.saveService, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceAction.saveServiceSuccess(response));
    yield call(browserHistory.push, ServicePath.SERVICE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(ServiceAction.saveServiceFailed(data));
  }
}

export function* watchSaveService() {
  yield call(takeLatest, ServiceAction.SAVE_SERVICE, saveService);
}

export function* deleteService(action) {
  const response = yield call(ServiceApi.deleteService, action.object);
  if (response === '') {
    yield put(ServiceAction.deleteServiceSuccess(action.object));
    yield put(ServiceAction.getServices());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(ServiceAction.deleteServiceFailed(data));
  }
}

export function* watchDeleteService() {
  yield call(takeLatest, ServiceAction.DELETE_SERVICE, deleteService);
}

export function* newService() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(ServiceAction.findServiceTypesByName());
}

export function* watchNewService() {
  yield call(takeLatest, ServiceAction.NEW_SERVICE, newService);
}

export function* findServicesByName(action) {
  const response = yield call(ServiceApi.findServicesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceAction.getServicesSuccess(response));
  } else if (!response.canceled) {
    yield put(ServiceAction.getServicesFailed());
  }
}

export function* watchFindServicesByName() {
  yield call(takeLatest, ServiceAction.FIND_SERVICES_BY_NAME, findServicesByName);
}

export const rootServiceSaga = [
  fork(watchGetServices),
  fork(watchGetService),
  fork(watchSaveService),
  fork(watchDeleteService),
  fork(watchNewService),
  fork(watchFindServicesByName),
];
