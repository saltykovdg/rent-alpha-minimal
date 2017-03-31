import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as RegistrationTypeAction from './../actions/RegistrationTypeAction';
import * as RegistrationTypeApi from './../api/RegistrationTypeApi';
import * as RegistrationTypePath from './../paths/RegistrationTypePath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getRegistrationTypes(action) {
  const response = yield call(RegistrationTypeApi.getRegistrationTypes, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(RegistrationTypeAction.getRegistrationTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(RegistrationTypeAction.getRegistrationTypesFailed());
  }
}

export function* watchGetRegistrationTypes() {
  yield takeLatest(RegistrationTypeAction.GET_REGISTRATION_TYPES, getRegistrationTypes);
}

export function* getRegistrationType(action) {
  const response = yield call(RegistrationTypeApi.getRegistrationType, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(RegistrationTypeAction.getRegistrationTypeSuccess(response));
  } else if (!response.canceled) {
    yield put(RegistrationTypeAction.getRegistrationTypeFailed(action.id));
  }
}

export function* watchGetRegistrationType() {
  yield takeLatest(RegistrationTypeAction.GET_REGISTRATION_TYPE, getRegistrationType);
}

export function* saveRegistrationType(action) {
  const response = yield call(RegistrationTypeApi.saveRegistrationType, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(RegistrationTypeAction.saveRegistrationTypeSuccess(response));
    yield call(browserHistory.push, RegistrationTypePath.REGISTRATION_TYPE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(RegistrationTypeAction.saveRegistrationTypeFailed(data));
  }
}

export function* watchSaveRegistrationType() {
  yield takeLatest(RegistrationTypeAction.SAVE_REGISTRATION_TYPE, saveRegistrationType);
}

export function* deleteRegistrationType(action) {
  const response = yield call(RegistrationTypeApi.deleteRegistrationType, action.object);
  if (response === '') {
    yield put(RegistrationTypeAction.deleteRegistrationTypeSuccess(action.object));
    yield put(RegistrationTypeAction.getRegistrationTypes(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(RegistrationTypeAction.deleteRegistrationTypeFailed(data));
  }
}

export function* watchDeleteRegistrationType() {
  yield takeLatest(RegistrationTypeAction.DELETE_REGISTRATION_TYPE, deleteRegistrationType);
}

export function* newRegistrationType() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewRegistrationType() {
  yield takeLatest(RegistrationTypeAction.NEW_REGISTRATION_TYPE, newRegistrationType);
}

export function* findRegistrationTypesByName(action) {
  const response = yield call(RegistrationTypeApi.findRegistrationTypesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(RegistrationTypeAction.getRegistrationTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(RegistrationTypeAction.getRegistrationTypesFailed());
  }
}

export function* watchFindRegistrationTypesByName() {
  yield takeLatest(RegistrationTypeAction.FIND_REGISTRATION_TYPES_BY_NAME, findRegistrationTypesByName);
}

export const rootRegistrationTypeSaga = [
  fork(watchGetRegistrationTypes),
  fork(watchGetRegistrationType),
  fork(watchSaveRegistrationType),
  fork(watchDeleteRegistrationType),
  fork(watchNewRegistrationType),
  fork(watchFindRegistrationTypesByName),
];
