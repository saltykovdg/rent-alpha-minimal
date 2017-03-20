export const GET_METERS = 'GET_METERS';
export const GET_METERS_SUCCESS = 'GET_METERS_SUCCESS';
export const GET_METERS_FAILED = 'GET_METERS_FAILED';
export const GET_METER = 'GET_METER';
export const GET_METER_SUCCESS = 'GET_METER_SUCCESS';
export const GET_METER_FAILED = 'GET_METER_FAILED';
export const SAVE_METER = 'SAVE_METER';
export const SAVE_METER_SUCCESS = 'SAVE_METER_SUCCESS';
export const SAVE_METER_FAILED = 'SAVE_METER_FAILED';
export const DELETE_METER = 'DELETE_METER';
export const DELETE_METER_SUCCESS = 'DELETE_METER_SUCCESS';
export const DELETE_METER_FAILED = 'DELETE_METER_FAILED';
export const NEW_METER = 'NEW_METER';
export const FIND_METERS_BY_NAME = 'FIND_METERS_BY_NAME';

// meter values
export const ADD_NEW_VALUE_TO_METER = 'ADD_NEW_VALUE_TO_METER';
export const EDIT_VALUE_IN_METER = 'EDIT_VALUE_IN_METER';
export const REMOVE_VALUE_FROM_METER = 'REMOVE_VALUE_FROM_METER';

export const getMeters = (page = 0) => {
  return {
    type: GET_METERS,
    page,
  };
};

export const getMetersSuccess = (data) => {
  return {
    type: GET_METERS_SUCCESS,
    data,
  };
};

export const getMetersFailed = () => {
  return {
    type: GET_METERS_FAILED,
  };
};

export const getMeter = (id) => {
  return {
    type: GET_METER,
    id,
  };
};

export const getMeterSuccess = (data) => {
  return {
    type: GET_METER_SUCCESS,
    data,
  };
};

export const getMeterFailed = (id) => {
  return {
    type: GET_METER_FAILED,
    id,
  };
};

export const saveMeter = (object) => {
  return {
    type: SAVE_METER,
    object,
  };
};

export const saveMeterSuccess = (data) => {
  return {
    type: SAVE_METER_SUCCESS,
    data,
  };
};

export const saveMeterFailed = (data) => {
  return {
    type: SAVE_METER_FAILED,
    data,
  };
};

export const deleteMeter = (object) => {
  return {
    type: DELETE_METER,
    object,
  };
};

export const deleteMeterSuccess = (object) => {
  return {
    type: DELETE_METER_SUCCESS,
    object,
  };
};

export const deleteMeterFailed = (data) => {
  return {
    type: DELETE_METER_FAILED,
    data,
  };
};

export const newMeter = () => {
  return {
    type: NEW_METER,
  };
};

export const findMetersByName = (name = '') => {
  return {
    type: FIND_METERS_BY_NAME,
    name,
  };
};

// meter values
export const addNewValueToMeter = (meterValue) => {
  return {
    type: ADD_NEW_VALUE_TO_METER,
    meterValue,
  };
};
export const editValueInMeter = (meterValue) => {
  return {
    type: EDIT_VALUE_IN_METER,
    meterValue,
  };
};
export const removeValueFromMeter = (meterValue) => {
  return {
    type: REMOVE_VALUE_FROM_METER,
    meterValue,
  };
};
