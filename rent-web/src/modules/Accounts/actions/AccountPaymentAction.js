export const GET_ACCOUNT_PAYMENTS = 'GET_ACCOUNT_PAYMENTS';
export const GET_ACCOUNT_PAYMENTS_SUCCESS = 'GET_ACCOUNT_PAYMENTS_SUCCESS';
export const GET_ACCOUNT_PAYMENTS_FAILED = 'GET_ACCOUNT_PAYMENTS_FAILED';
export const ADD_ACCOUNT_PAYMENT = 'ADD_ACCOUNT_PAYMENT';
export const ADD_ACCOUNT_PAYMENT_SUCCESS = 'ADD_ACCOUNT_PAYMENT_SUCCESS';
export const ADD_ACCOUNT_PAYMENT_FAILED = 'ADD_ACCOUNT_PAYMENT_FAILED';
export const DELETE_ACCOUNT_PAYMENT = 'DELETE_ACCOUNT_PAYMENT';
export const DELETE_ACCOUNT_PAYMENT_SUCCESS = 'DELETE_ACCOUNT_PAYMENT_SUCCESS';
export const DELETE_ACCOUNT_PAYMENT_FAILED = 'DELETE_ACCOUNT_PAYMENT_FAILED';

// get account payments
export const getAccountPayments = (accountId = '', page = 0, size = 5) => {
  return {
    type: GET_ACCOUNT_PAYMENTS,
    accountId,
    page,
    size,
  };
};
export const getAccountPaymentsSuccess = (data) => {
  return {
    type: GET_ACCOUNT_PAYMENTS_SUCCESS,
    data,
  };
};
export const getAccountPaymentsFailed = () => {
  return {
    type: GET_ACCOUNT_PAYMENTS_FAILED,
  };
};

// add account payment
export const addAccountPayment = (accountId = '', sum = 0) => {
  return {
    type: ADD_ACCOUNT_PAYMENT,
    accountId,
    sum,
  };
};
export const addAccountPaymentSuccess = (data) => {
  return {
    type: ADD_ACCOUNT_PAYMENT_SUCCESS,
    data,
  };
};
export const addAccountPaymentFailed = () => {
  return {
    type: ADD_ACCOUNT_PAYMENT_FAILED,
  };
};

// delete account payment
export const deleteAccountPayment = (accountId = '', paymentBundleId = '') => {
  return {
    type: DELETE_ACCOUNT_PAYMENT,
    paymentBundleId,
  };
};
export const deleteAccountPaymentSuccess = (data) => {
  return {
    type: DELETE_ACCOUNT_PAYMENT_SUCCESS,
    data,
  };
};
export const deleteAccountPaymentFailed = () => {
  return {
    type: DELETE_ACCOUNT_PAYMENT_FAILED,
  };
};
