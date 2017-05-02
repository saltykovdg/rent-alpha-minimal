import { call, put, fork, takeLatest, all } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as GenderTypeAction from './../actions/GenderTypeAction';
import * as GenderTypeApi from './../api/GenderTypeApi';
import * as GenderTypePath from './../paths/GenderTypePath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getGenderTypes(action) {
  const response = yield call(GenderTypeApi.getGenderTypes, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(GenderTypeAction.getGenderTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(GenderTypeAction.getGenderTypesFailed());
  }
}

export function* watchGetGenderTypes() {
  yield takeLatest(GenderTypeAction.GET_GENDER_TYPES, getGenderTypes);
}

export function* getGenderType(action) {
  const response = yield call(GenderTypeApi.getGenderType, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(GenderTypeAction.getGenderTypeSuccess(response));
  } else if (!response.canceled) {
    yield put(GenderTypeAction.getGenderTypeFailed(action.id));
  }
}

export function* watchGetGenderType() {
  yield takeLatest(GenderTypeAction.GET_GENDER_TYPE, getGenderType);
}

export function* saveGenderType(action) {
  const response = yield call(GenderTypeApi.saveGenderType, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(GenderTypeAction.saveGenderTypeSuccess(response));
    yield call(browserHistory.push, GenderTypePath.GENDER_TYPE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(GenderTypeAction.saveGenderTypeFailed(data));
  }
}

export function* watchSaveGenderType() {
  yield takeLatest(GenderTypeAction.SAVE_GENDER_TYPE, saveGenderType);
}

export function* deleteGenderType(action) {
  const response = yield call(GenderTypeApi.deleteGenderType, action.object);
  if (response === '') {
    yield put(GenderTypeAction.deleteGenderTypeSuccess(action.object));
    yield put(GenderTypeAction.getGenderTypes(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(GenderTypeAction.deleteGenderTypeFailed(data));
  }
}

export function* watchDeleteGenderType() {
  yield takeLatest(GenderTypeAction.DELETE_GENDER_TYPE, deleteGenderType);
}

export function* newGenderType() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewGenderType() {
  yield takeLatest(GenderTypeAction.NEW_GENDER_TYPE, newGenderType);
}

export function* findGenderTypesByName(action) {
  const response = yield call(GenderTypeApi.findGenderTypesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(GenderTypeAction.getGenderTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(GenderTypeAction.getGenderTypesFailed());
  }
}

export function* watchFindGenderTypesByName() {
  yield takeLatest(GenderTypeAction.FIND_GENDER_TYPES_BY_NAME, findGenderTypesByName);
}

export const rootGenderTypeSaga = all([
  fork(watchGetGenderTypes),
  fork(watchGetGenderType),
  fork(watchSaveGenderType),
  fork(watchDeleteGenderType),
  fork(watchNewGenderType),
  fork(watchFindGenderTypesByName),
]);
