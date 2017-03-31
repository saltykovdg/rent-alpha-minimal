import { call, put, fork, take, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as OrganizationAction from './OrganizationActions';
import * as OrganizationApi from './OrganizationApi';
import * as OrganizationPath from './OrganizationPaths';
import * as ApiCaller from '../../util/ApiCaller';

// get lists
export function* getContractorTypes(action) {
  const response = yield call(OrganizationApi.getContractorTypes, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(OrganizationAction.getContractorTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(OrganizationAction.getContractorTypesFailed());
  }
}
export function* getContractors(action) {
  const response = yield call(OrganizationApi.getContractors, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(OrganizationAction.getContractorsSuccess(response));
  } else if (!response.canceled) {
    yield put(OrganizationAction.getContractorsFailed());
  }
}

export function* watchGetContractorTypes() {
  yield takeLatest(OrganizationAction.GET_CONTRACTOR_TYPES, getContractorTypes);
}
export function* watchGetContractors() {
  yield takeLatest(OrganizationAction.GET_CONTRACTORS, getContractors);
}

// get by id
export function* getContractorType(action) {
  const response = yield call(OrganizationApi.getContractorType, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(OrganizationAction.getContractorTypeSuccess(response));
  } else if (!response.canceled) {
    yield put(OrganizationAction.getContractorTypeFailed(action.id));
  }
}
export function* getContractor(action) {
  const response = yield call(OrganizationApi.getContractor, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(OrganizationAction.findContractorTypesByName());
    const sagaAction = yield take([OrganizationAction.GET_CONTRACTOR_TYPES_SUCCESS, OrganizationAction.GET_CONTRACTOR_TYPES_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(OrganizationAction.getContractorSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(OrganizationAction.getContractorFailed(action.id));
  }
}

export function* watchGetContractorType() {
  yield takeLatest(OrganizationAction.GET_CONTRACTOR_TYPE, getContractorType);
}
export function* watchGetContractor() {
  yield takeLatest(OrganizationAction.GET_CONTRACTOR, getContractor);
}

// save
export function* saveContractorType(action) {
  const response = yield call(OrganizationApi.saveContractorType, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(OrganizationAction.saveContractorTypeSuccess(response));
    yield call(browserHistory.push, OrganizationPath.CONTRACTOR_TYPE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(OrganizationAction.saveContractorTypeFailed(data));
  }
}
export function* saveContractor(action) {
  const response = yield call(OrganizationApi.saveContractor, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(OrganizationAction.saveContractorSuccess(response));
    yield call(browserHistory.push, OrganizationPath.CONTRACTOR_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(OrganizationAction.saveContractorFailed(data));
  }
}

export function* watchSaveContractorType() {
  yield takeLatest(OrganizationAction.SAVE_CONTRACTOR_TYPE, saveContractorType);
}
export function* watchSaveContractor() {
  yield takeLatest(OrganizationAction.SAVE_CONTRACTOR, saveContractor);
}

// delete
export function* deleteContractorType(action) {
  const response = yield call(OrganizationApi.deleteContractorType, action.object);
  if (response === '') {
    yield put(OrganizationAction.deleteContractorTypeSuccess(action.object));
    yield put(OrganizationAction.getContractorTypes(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(OrganizationAction.deleteContractorTypeFailed(data));
  }
}
export function* deleteContractor(action) {
  const response = yield call(OrganizationApi.deleteContractor, action.object);
  if (response === '') {
    yield put(OrganizationAction.deleteContractorSuccess(action.object));
    yield put(OrganizationAction.getContractors(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(OrganizationAction.deleteContractorFailed(data));
  }
}

export function* watchDeleteContractorType() {
  yield takeLatest(OrganizationAction.DELETE_CONTRACTOR_TYPE, deleteContractorType);
}
export function* watchDeleteContractor() {
  yield takeLatest(OrganizationAction.DELETE_CONTRACTOR, deleteContractor);
}

// new record
export function* newContractorType() {
  yield call(ApiCaller.cancelAllRequests);
}
export function* newContractor() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(OrganizationAction.findContractorTypesByName());
}

export function* watchNewContractorType() {
  yield takeLatest(OrganizationAction.NEW_CONTRACTOR_TYPE, newContractorType);
}
export function* watchNewContractor() {
  yield takeLatest(OrganizationAction.NEW_CONTRACTOR, newContractor);
}

// find
export function* findContractorTypesByName(action) {
  const response = yield call(OrganizationApi.findContractorTypesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(OrganizationAction.getContractorTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(OrganizationAction.getContractorTypesFailed());
  }
}
export function* findContractorsByName(action) {
  const response = yield call(OrganizationApi.findContractorsByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(OrganizationAction.getContractorsSuccess(response));
  } else if (!response.canceled) {
    yield put(OrganizationAction.getContractorsFailed());
  }
}

export function* watchFindContractorTypesByName() {
  yield takeLatest(OrganizationAction.FIND_CONTRACTOR_TYPES_BY_NAME, findContractorTypesByName);
}
export function* watchFindContractorsByName() {
  yield takeLatest(OrganizationAction.FIND_CONTRACTORS_BY_NAME, findContractorsByName);
}

export const rootOrganizationSaga = [
  // get lists
  fork(watchGetContractorTypes),
  fork(watchGetContractors),

  // get by id
  fork(watchGetContractorType),
  fork(watchGetContractor),

  // save
  fork(watchSaveContractorType),
  fork(watchSaveContractor),

  // delete
  fork(watchDeleteContractorType),
  fork(watchDeleteContractor),

  // new record
  fork(watchNewContractorType),
  fork(watchNewContractor),

  // find
  fork(watchFindContractorTypesByName),
  fork(watchFindContractorsByName),
];
