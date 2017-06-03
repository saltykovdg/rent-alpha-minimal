import { call, put, fork, takeLatest, all } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as RoleAction from './../actions/RoleAction';
import * as RoleApi from './../api/RoleApi';
import * as RolePath from './../paths/RolePath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getRoles(action) {
  const response = yield call(RoleApi.getRoles, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(RoleAction.getRolesSuccess(response));
  } else if (!response.canceled) {
    yield put(RoleAction.getRolesFailed());
  }
}

export function* watchGetRoles() {
  yield takeLatest(RoleAction.GET_ROLES, getRoles);
}

export function* getRole(action) {
  const response = yield call(RoleApi.getRole, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(RoleAction.getRoleSuccess(response));
  } else if (!response.canceled) {
    yield put(RoleAction.getRoleFailed(action.id));
  }
}

export function* watchGetRole() {
  yield takeLatest(RoleAction.GET_ROLE, getRole);
}

export function* saveRole(action) {
  const response = yield call(RoleApi.saveRole, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(RoleAction.saveRoleSuccess(response));
    yield call(browserHistory.push, RolePath.ROLE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(RoleAction.saveRoleFailed(data));
  }
}

export function* watchSaveRole() {
  yield takeLatest(RoleAction.SAVE_ROLE, saveRole);
}

export function* deleteRole(action) {
  const response = yield call(RoleApi.deleteRole, action.object);
  if (response === '') {
    yield put(RoleAction.deleteRoleSuccess(action.object));
    yield put(RoleAction.getRoles(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(RoleAction.deleteRoleFailed(data));
  }
}

export function* watchDeleteRole() {
  yield takeLatest(RoleAction.DELETE_ROLE, deleteRole);
}

export function* newRole() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewRole() {
  yield takeLatest(RoleAction.NEW_ROLE, newRole);
}

export function* findRolesByName(action) {
  const response = yield call(RoleApi.findRolesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(RoleAction.getRolesSuccess(response));
  } else if (!response.canceled) {
    yield put(RoleAction.getRolesFailed());
  }
}

export function* watchFindRolesByName() {
  yield takeLatest(RoleAction.FIND_ROLES_BY_NAME, findRolesByName);
}

export const rootRoleSaga = all([
  fork(watchGetRoles),
  fork(watchGetRole),
  fork(watchSaveRole),
  fork(watchDeleteRole),
  fork(watchNewRole),
  fork(watchFindRolesByName),
]);
