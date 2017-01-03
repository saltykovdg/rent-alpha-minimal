import { call, put, fork, take, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as ServiceTypeAction from './../actions/ServiceTypeAction';
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
  yield takeLatest(ServiceAction.GET_SERVICES, getServices);
}

export function* getService(action) {
  const response = yield call(ServiceApi.getService, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceTypeAction.findServiceTypesByName());
    const sagaAction = yield take([ServiceTypeAction.GET_SERVICE_TYPES_SUCCESS, ServiceTypeAction.GET_SERVICE_TYPES_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(ServiceAction.getServiceSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(ServiceAction.getServiceFailed(action.id));
  }
}

export function* watchGetService() {
  yield takeLatest(ServiceAction.GET_SERVICE, getService);
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
  yield takeLatest(ServiceAction.SAVE_SERVICE, saveService);
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
  yield takeLatest(ServiceAction.DELETE_SERVICE, deleteService);
}

export function* newService() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(ServiceTypeAction.findServiceTypesByName());
}

export function* watchNewService() {
  yield takeLatest(ServiceAction.NEW_SERVICE, newService);
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
  yield takeLatest(ServiceAction.FIND_SERVICES_BY_NAME, findServicesByName);
}

export const rootServiceSaga = [
  fork(watchGetServices),
  fork(watchGetService),
  fork(watchSaveService),
  fork(watchDeleteService),
  fork(watchNewService),
  fork(watchFindServicesByName),
];
