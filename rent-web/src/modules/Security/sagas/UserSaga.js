import { call, put, fork, takeLatest, all, take } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as UserAction from './../actions/UserAction';
import * as RoleAction from './../actions/RoleAction';
import * as UserApi from './../api/UserApi';
import * as UserPath from './../paths/UserPath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getUsers(action) {
  const response = yield call(UserApi.getUsers, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(UserAction.getUsersSuccess(response));
  } else if (!response.canceled) {
    yield put(UserAction.getUsersFailed());
  }
}

export function* watchGetUsers() {
  yield takeLatest(UserAction.GET_USERS, getUsers);
}

export function* getUser(action) {
  const response = yield call(UserApi.getUser, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(RoleAction.findRolesByName());
    const sagaAction = yield take([RoleAction.GET_ROLES_SUCCESS, RoleAction.GET_ROLES_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(UserAction.getUserSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(UserAction.getUserFailed(action.id));
  }
}

export function* watchGetUser() {
  yield takeLatest(UserAction.GET_USER, getUser);
}

export function* saveUser(action) {
  const response = yield call(UserApi.saveUser, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(UserAction.saveUserSuccess(response));
    yield call(browserHistory.push, UserPath.USER_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(UserAction.saveUserFailed(data));
  }
}

export function* watchSaveUser() {
  yield takeLatest(UserAction.SAVE_USER, saveUser);
}

export function* deleteUser(action) {
  const response = yield call(UserApi.deleteUser, action.object);
  if (response === '') {
    yield put(UserAction.deleteUserSuccess(action.object));
    yield put(UserAction.getUsers(action.page));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(UserAction.deleteUserFailed(data));
  }
}

export function* watchDeleteUser() {
  yield takeLatest(UserAction.DELETE_USER, deleteUser);
}

export function* newUser() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(RoleAction.findRolesByName());
}

export function* watchNewUser() {
  yield takeLatest(UserAction.NEW_USER, newUser);
}

export const rootUserSaga = all([
  fork(watchGetUsers),
  fork(watchGetUser),
  fork(watchSaveUser),
  fork(watchDeleteUser),
  fork(watchNewUser),
]);
