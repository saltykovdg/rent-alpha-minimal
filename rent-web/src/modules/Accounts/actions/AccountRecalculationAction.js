export const GET_ACCOUNT_RECALCULATIONS = 'GET_ACCOUNT_RECALCULATIONS';
export const GET_ACCOUNT_RECALCULATIONS_SUCCESS = 'GET_ACCOUNT_RECALCULATIONS_SUCCESS';
export const GET_ACCOUNT_RECALCULATIONS_FAILED = 'GET_ACCOUNT_RECALCULATIONS_FAILED';
export const ADD_ACCOUNT_RECALCULATION = 'ADD_ACCOUNT_RECALCULATION';
export const ADD_ACCOUNT_RECALCULATION_SUCCESS = 'ADD_ACCOUNT_RECALCULATION_SUCCESS';
export const ADD_ACCOUNT_RECALCULATION_FAILED = 'ADD_ACCOUNT_RECALCULATION_FAILED';
export const DELETE_ACCOUNT_RECALCULATION = 'DELETE_ACCOUNT_RECALCULATION';
export const DELETE_ACCOUNT_RECALCULATION_SUCCESS = 'DELETE_ACCOUNT_RECALCULATION_SUCCESS';
export const DELETE_ACCOUNT_RECALCULATION_FAILED = 'DELETE_ACCOUNT_RECALCULATION_FAILED';

// get account recalculation
export const getAccountRecalculations = (accountId = '', page = 0, size = 5) => {
  return {
    type: GET_ACCOUNT_RECALCULATIONS,
    accountId,
    page,
    size,
  };
};
export const getAccountRecalculationsSuccess = (data) => {
  return {
    type: GET_ACCOUNT_RECALCULATIONS_SUCCESS,
    data,
  };
};
export const getAccountRecalculationsFailed = () => {
  return {
    type: GET_ACCOUNT_RECALCULATIONS_FAILED,
  };
};

// add account recalculation
export const addAccountRecalculation = (accountId = '', accountServiceId = '', sum = 0, note = '', workingPeriodId) => {
  return {
    type: ADD_ACCOUNT_RECALCULATION,
    accountId,
    accountServiceId,
    sum,
    note,
    workingPeriodId,
  };
};
export const addAccountRecalculationSuccess = (data) => {
  return {
    type: ADD_ACCOUNT_RECALCULATION_SUCCESS,
    data,
  };
};
export const addAccountRecalculationFailed = () => {
  return {
    type: ADD_ACCOUNT_RECALCULATION_FAILED,
  };
};

// delete account recalculation
export const deleteAccountRecalculation = (accountId = '', bundleId = '', workingPeriodId) => {
  return {
    type: DELETE_ACCOUNT_RECALCULATION,
    accountId,
    bundleId,
    workingPeriodId,
  };
};
export const deleteAccountRecalculationSuccess = (data) => {
  return {
    type: DELETE_ACCOUNT_RECALCULATION_SUCCESS,
    data,
  };
};
export const deleteAccountRecalculationFailed = () => {
  return {
    type: DELETE_ACCOUNT_RECALCULATION_FAILED,
  };
};
