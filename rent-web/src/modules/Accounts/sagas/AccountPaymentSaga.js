import { call, put, fork, takeLatest, all, take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as AccountPaymentAction from './../actions/AccountPaymentAction';
import * as AccountAction from './../actions/AccountAction';
import * as AccountPaymentApi from './../api/AccountPaymentApi';

export function* getAccountPayments(action) {
  const response = yield call(AccountPaymentApi.getAccountPayments, action.accountId, action.page, action.size);
  if (response && !response.error && !response.canceled) {
    yield put(AccountPaymentAction.getAccountPaymentsSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountPaymentAction.getAccountPaymentsFailed());
  }
}
export function* watchGetAccountPayments() {
  yield takeLatest(AccountPaymentAction.GET_ACCOUNT_PAYMENTS, getAccountPayments);
}

export function* addAccountPayment(action) {
  const response = yield call(AccountPaymentApi.addAccountPayment, action.accountId, action.sum);
  if (response && !response.error && !response.canceled) {
    yield put(AccountPaymentAction.addAccountPaymentSuccess(response));
    yield put(AccountPaymentAction.getAccountPayments(action.accountId));
    if (action.workingPeriodId) {
      const sagaAction = yield take([AccountPaymentAction.GET_ACCOUNT_PAYMENTS_SUCCESS, AccountPaymentAction.GET_ACCOUNT_PAYMENTS_FAILED, LOCATION_CHANGE]);
      if (sagaAction.type !== LOCATION_CHANGE) {
        yield put(AccountAction.getAccountCalculations(action.accountId, action.workingPeriodId));
      }
    }
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountPaymentAction.addAccountPaymentFailed(data));
  }
}
export function* watchAddAccountPayment() {
  yield takeLatest(AccountPaymentAction.ADD_ACCOUNT_PAYMENT, addAccountPayment);
}

export function* deleteAccountPayment(action) {
  const response = yield call(AccountPaymentApi.deleteAccountPayment, action.paymentBundleId);
  if (response === '200') {
    yield put(AccountPaymentAction.deleteAccountPaymentSuccess(action.paymentBundleId));
    yield put(AccountPaymentAction.getAccountPayments(action.accountId));
    if (action.workingPeriodId) {
      const sagaAction = yield take([AccountPaymentAction.GET_ACCOUNT_PAYMENTS_SUCCESS, AccountPaymentAction.GET_ACCOUNT_PAYMENTS_FAILED, LOCATION_CHANGE]);
      if (sagaAction.type !== LOCATION_CHANGE) {
        yield put(AccountAction.getAccountCalculations(action.accountId, action.workingPeriodId));
      }
    }
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountPaymentAction.deleteAccountPaymentFailed(data));
  }
}
export function* watchDeleteAccountPayment() {
  yield takeLatest(AccountPaymentAction.DELETE_ACCOUNT_PAYMENT, deleteAccountPayment);
}

export const rootAccountPaymentSaga = all([
  fork(watchGetAccountPayments),
  fork(watchAddAccountPayment),
  fork(watchDeleteAccountPayment),
]);
