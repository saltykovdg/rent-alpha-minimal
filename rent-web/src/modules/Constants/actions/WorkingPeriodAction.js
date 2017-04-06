export const GET_WORKING_PERIODS = 'GET_WORKING_PERIODS';
export const GET_WORKING_PERIODS_SUCCESS = 'GET_WORKING_PERIODS_SUCCESS';
export const GET_WORKING_PERIODS_FAILED = 'GET_WORKING_PERIODS_FAILED';
export const GET_WORKING_PERIOD = 'GET_WORKING_PERIOD';
export const GET_WORKING_PERIOD_SUCCESS = 'GET_WORKING_PERIOD_SUCCESS';
export const GET_WORKING_PERIOD_FAILED = 'GET_WORKING_PERIOD_FAILED';
export const FIND_WORKING_PERIODS_BY_NAME = 'FIND_WORKING_PERIODS_BY_NAME';
export const FIND_LAST_WORKING_PERIOD = 'FIND_LAST_WORKING_PERIOD';

export const getWorkingPeriods = (page = 0) => {
  return {
    type: GET_WORKING_PERIODS,
    page,
  };
};

export const getWorkingPeriodsSuccess = (data) => {
  return {
    type: GET_WORKING_PERIODS_SUCCESS,
    data,
  };
};

export const getWorkingPeriodsFailed = () => {
  return {
    type: GET_WORKING_PERIODS_FAILED,
  };
};

export const getWorkingPeriod = (id) => {
  return {
    type: GET_WORKING_PERIOD,
    id,
  };
};

export const getWorkingPeriodSuccess = (data) => {
  return {
    type: GET_WORKING_PERIOD_SUCCESS,
    data,
  };
};

export const getWorkingPeriodFailed = (id) => {
  return {
    type: GET_WORKING_PERIOD_FAILED,
    id,
  };
};

export const findWorkingPeriodsByName = (name = '') => {
  return {
    type: FIND_WORKING_PERIODS_BY_NAME,
    name,
  };
};

export const findLastWorkingPeriod = () => {
  return {
    type: FIND_LAST_WORKING_PERIOD,
  };
};
