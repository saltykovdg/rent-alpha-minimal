import { call, put, fork, takeLatest, all } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as LoginAction from './../actions/LoginAction';
import * as LoginApi from './../api/LoginApi';
import * as AuthUtil from './../../../util/AuthUtil';

export function* login(action) {
  const response = yield call(LoginApi.login, { username: action.object.username, password: action.object.password });
  if (response && !response.error && !response.canceled) {
    AuthUtil.login(response.authorization, action.object.remember);
    yield put(LoginAction.loginSuccess(response));
    yield call(browserHistory.push, '/');
  } else if (!response.canceled) {
    yield put(LoginAction.loginFailed());
  }
}

export function* watchLogin() {
  yield takeLatest(LoginAction.LOGIN, login);
}

export const rootLoginSaga = all([
  fork(watchLogin),
]);
