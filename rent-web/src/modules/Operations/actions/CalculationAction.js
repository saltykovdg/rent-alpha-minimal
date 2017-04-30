export const CALCULATE_ACCOUNTS = 'CALCULATE_ACCOUNTS';
export const CALCULATE_ACCOUNTS_SUCCESS = 'CALCULATE_ACCOUNTS_SUCCESS';
export const CALCULATE_ACCOUNTS_FAILED = 'CALCULATE_ACCOUNTS_FAILED';

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
