export const CALCULATE_ACCOUNTS = 'CALCULATE_ACCOUNTS';
export const CALCULATE_ACCOUNTS_SUCCESS = 'CALCULATE_ACCOUNTS_SUCCESS';
export const CALCULATE_ACCOUNTS_FAILED = 'CALCULATE_ACCOUNTS_FAILED';

export const CLOSE_WORKING_PERIOD = 'CLOSE_WORKING_PERIOD';
export const CLOSE_WORKING_PERIOD_SUCCESS = 'CLOSE_WORKING_PERIOD_SUCCESS';
export const CLOSE_WORKING_PERIOD_FAILED = 'CLOSE_WORKING_PERIOD_FAILED';

export const calculateAccounts = (periodStartId, periodEndId) => {
  return {
    type: CALCULATE_ACCOUNTS,
    periodStartId,
    periodEndId,
  };
};
export const calculateAccountsSuccess = (data) => {
  return {
    type: CALCULATE_ACCOUNTS_SUCCESS,
    data,
  };
};
export const calculateAccountsFailed = () => {
  return {
    type: CALCULATE_ACCOUNTS_FAILED,
  };
};

export const closeWorkingPeriod = () => {
  return {
    type: CLOSE_WORKING_PERIOD,
  };
};
export const closeWorkingPeriodSuccess = (data) => {
  return {
    type: CLOSE_WORKING_PERIOD_SUCCESS,
    data,
  };
};
export const closeWorkingPeriodFailed = () => {
  return {
    type: CLOSE_WORKING_PERIOD_FAILED,
  };
};
