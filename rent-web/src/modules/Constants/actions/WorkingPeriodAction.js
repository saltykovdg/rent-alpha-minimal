export const GET_WORKING_PERIODS = 'GET_WORKING_PERIODS';
export const GET_WORKING_PERIODS_SUCCESS = 'GET_WORKING_PERIODS_SUCCESS';
export const GET_WORKING_PERIODS_FAILED = 'GET_WORKING_PERIODS_FAILED';
export const GET_WORKING_PERIOD = 'GET_WORKING_PERIOD';
export const GET_WORKING_PERIOD_SUCCESS = 'GET_WORKING_PERIOD_SUCCESS';
export const GET_WORKING_PERIOD_FAILED = 'GET_WORKING_PERIOD_FAILED';
export const SAVE_WORKING_PERIOD = 'SAVE_WORKING_PERIOD';
export const SAVE_WORKING_PERIOD_SUCCESS = 'SAVE_WORKING_PERIOD_SUCCESS';
export const SAVE_WORKING_PERIOD_FAILED = 'SAVE_WORKING_PERIOD_FAILED';
export const DELETE_WORKING_PERIOD = 'DELETE_WORKING_PERIOD';
export const DELETE_WORKING_PERIOD_SUCCESS = 'DELETE_WORKING_PERIOD_SUCCESS';
export const DELETE_WORKING_PERIOD_FAILED = 'DELETE_WORKING_PERIOD_FAILED';
export const NEW_WORKING_PERIOD = 'NEW_WORKING_PERIOD';
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

export const saveWorkingPeriod = (object) => {
  return {
    type: SAVE_WORKING_PERIOD,
    object,
  };
};

export const saveWorkingPeriodSuccess = (data) => {
  return {
    type: SAVE_WORKING_PERIOD_SUCCESS,
    data,
  };
};

export const saveWorkingPeriodFailed = (data) => {
  return {
    type: SAVE_WORKING_PERIOD_FAILED,
    data,
  };
};

export const deleteWorkingPeriod = (object, page = 0) => {
  return {
    type: DELETE_WORKING_PERIOD,
    object,
    page,
  };
};

export const deleteWorkingPeriodSuccess = (object) => {
  return {
    type: DELETE_WORKING_PERIOD_SUCCESS,
    object,
  };
};

export const deleteWorkingPeriodFailed = (data) => {
  return {
    type: DELETE_WORKING_PERIOD_FAILED,
    data,
  };
};

export const newWorkingPeriod = () => {
  return {
    type: NEW_WORKING_PERIOD,
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
