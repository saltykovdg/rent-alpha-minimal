import { takeLatest } from 'redux-saga';
import { call, put, fork, take } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as OrganizationAction from './../../Organization/OrganizationActions';
import * as AddressAction from './../../Address/AddressActions';
import * as AccountAction from './../actions/AccountAction';
import * as ParameterTypeAction from './../../Constants/actions/ParameterTypeAction';
import * as AccountApi from './../api/AccountApi';
import * as AccountPath from './../paths/AccountPath';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getAccounts(action) {
  const response = yield call(AccountApi.getAccounts, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountAction.getAccountsSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountAction.getAccountsFailed());
  }
}

export function* watchGetAccounts() {
  yield call(takeLatest, AccountAction.GET_ACCOUNTS, getAccounts);
}

export function* getAccount(action) {
  const response = yield call(AccountApi.getAccount, action.id);
  if (response && !response.error && !response.canceled) {
    let sagaAction;
    yield put(OrganizationAction.findContractorsByName());
    sagaAction = yield take([OrganizationAction.GET_CONTRACTORS_SUCCESS, OrganizationAction.GET_CONTRACTORS_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AddressAction.findStreetsByName());
      sagaAction = yield take([AddressAction.GET_STREETS_SUCCESS, AddressAction.GET_STREETS_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AddressAction.findBuildingsByStreetId(response.apartment.building.street.id));
      sagaAction = yield take([AddressAction.GET_BUILDINGS_SUCCESS, AddressAction.GET_BUILDINGS_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AddressAction.findApartmentsByBuildingId(response.apartment.building.id));
      sagaAction = yield take([AddressAction.GET_APARTMENTS_SUCCESS, AddressAction.GET_APARTMENTS_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(ParameterTypeAction.findParameterTypesByName());
      sagaAction = yield take([ParameterTypeAction.GET_PARAMETER_TYPES_SUCCESS, ParameterTypeAction.GET_PARAMETER_TYPES_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AccountAction.getAccountSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(AccountAction.getAccountFailed(action.id));
  }
}

export function* watchGetAccount() {
  yield call(takeLatest, AccountAction.GET_ACCOUNT, getAccount);
}

export function* saveAccount(action) {
  const response = yield call(AccountApi.saveAccount, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(AccountAction.saveAccountSuccess(response));
    yield call(browserHistory.push, AccountPath.ACCOUNT_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountAction.saveAccountFailed(data));
  }
}

export function* watchSaveAccount() {
  yield call(takeLatest, AccountAction.SAVE_ACCOUNT, saveAccount);
}

export function* deleteAccount(action) {
  const response = yield call(AccountApi.deleteAccount, action.object);
  if (response === '') {
    yield put(AccountAction.deleteAccountSuccess(action.object));
    yield put(AccountAction.getAccounts());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountAction.deleteAccountFailed(data));
  }
}

export function* watchDeleteAccount() {
  yield call(takeLatest, AccountAction.DELETE_ACCOUNT, deleteAccount);
}

export function* newAccount() {
  yield call(ApiCaller.cancelAllRequests);
  let sagaAction;
  yield put(OrganizationAction.findContractorsByName());
  sagaAction = yield take([OrganizationAction.GET_CONTRACTORS_SUCCESS, OrganizationAction.GET_CONTRACTORS_FAILED, LOCATION_CHANGE]);
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(AddressAction.findStreetsByName());
    sagaAction = yield take([AddressAction.GET_STREETS_SUCCESS, OrganizationAction.GET_STREETS_FAILED, LOCATION_CHANGE]);
  }
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(AddressAction.findBuildingsByStreetId());
    sagaAction = yield take([AddressAction.GET_BUILDINGS_SUCCESS, AddressAction.GET_BUILDINGS_FAILED, LOCATION_CHANGE]);
  }
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(AddressAction.findApartmentsByBuildingId());
    sagaAction = yield take([AddressAction.GET_APARTMENTS_SUCCESS, AddressAction.GET_APARTMENTS_FAILED, LOCATION_CHANGE]);
  }
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(ParameterTypeAction.findParameterTypesByName());
    sagaAction = yield take([ParameterTypeAction.GET_PARAMETER_TYPES_SUCCESS, ParameterTypeAction.GET_PARAMETER_TYPES_FAILED, LOCATION_CHANGE]);
  }
}

export function* watchNewAccount() {
  yield call(takeLatest, AccountAction.NEW_ACCOUNT, newAccount);
}

export function* findAccountsByAccountNumber(action) {
  const response = yield call(AccountApi.findAccountsByAccountNumber, action.accountNumber, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountAction.getAccountsSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountAction.getAccountsFailed());
  }
}

export function* watchFindAccountsByAccountNumber() {
  yield call(takeLatest, AccountAction.FIND_ACCOUNTS_BY_ACCOUNT_NUMBER, findAccountsByAccountNumber);
}

export const rootAccountSaga = [
  fork(watchGetAccounts),
  fork(watchGetAccount),
  fork(watchSaveAccount),
  fork(watchDeleteAccount),
  fork(watchNewAccount),
  fork(watchFindAccountsByAccountNumber),
];
