export const GET_ACCOUNT_METERS = 'GET_ACCOUNT_METERS';
export const GET_ACCOUNT_METERS_SUCCESS = 'GET_ACCOUNT_METERS_SUCCESS';
export const GET_ACCOUNT_METERS_FAILED = 'GET_ACCOUNT_METERS_FAILED';
export const GET_ACCOUNT_METER = 'GET_ACCOUNT_METER';
export const GET_ACCOUNT_METER_SUCCESS = 'GET_ACCOUNT_METER_SUCCESS';
export const GET_ACCOUNT_METER_FAILED = 'GET_ACCOUNT_METER_FAILED';
export const SAVE_ACCOUNT_METER = 'SAVE_ACCOUNT_METER';
export const SAVE_ACCOUNT_METER_SUCCESS = 'SAVE_ACCOUNT_METER_SUCCESS';
export const SAVE_ACCOUNT_METER_FAILED = 'SAVE_ACCOUNT_METER_FAILED';
export const DELETE_ACCOUNT_METER = 'DELETE_ACCOUNT_METER';
export const DELETE_ACCOUNT_METER_SUCCESS = 'DELETE_ACCOUNT_METER_SUCCESS';
export const DELETE_ACCOUNT_METER_FAILED = 'DELETE_ACCOUNT_METER_FAILED';
export const NEW_ACCOUNT_METER = 'NEW_ACCOUNT_METER';

export const getAccountMeters = (page = 0) => {
  return {
    type: GET_ACCOUNT_METERS,
    page,
  };
};

export const getAccountMetersSuccess = (data) => {
  return {
    type: GET_ACCOUNT_METERS_SUCCESS,
    data,
  };
};

export const getAccountMetersFailed = () => {
  return {
    type: GET_ACCOUNT_METERS_FAILED,
  };
};

export const getAccountMeter = (id) => {
  return {
    type: GET_ACCOUNT_METER,
    id,
  };
};

export const getAccountMeterSuccess = (data) => {
  return {
    type: GET_ACCOUNT_METER_SUCCESS,
    data,
  };
};

export const getAccountMeterFailed = (id) => {
  return {
    type: GET_ACCOUNT_METER_FAILED,
    id,
  };
};

export const saveAccountMeter = (object) => {
  return {
    type: SAVE_ACCOUNT_METER,
    object,
  };
};

export const saveAccountMeterSuccess = (data) => {
  return {
    type: SAVE_ACCOUNT_METER_SUCCESS,
    data,
  };
};

export const saveAccountMeterFailed = (data) => {
  return {
    type: SAVE_ACCOUNT_METER_FAILED,
    data,
  };
};

export const deleteAccountMeter = (object) => {
  return {
    type: DELETE_ACCOUNT_METER,
    object,
  };
};

export const deleteAccountMeterSuccess = (object) => {
  return {
    type: DELETE_ACCOUNT_METER_SUCCESS,
    object,
  };
};

export const deleteAccountMeterFailed = (data) => {
  return {
    type: DELETE_ACCOUNT_METER_FAILED,
    data,
  };
};

export const newAccountMeter = () => {
  return {
    type: NEW_ACCOUNT_METER,
  };
};
