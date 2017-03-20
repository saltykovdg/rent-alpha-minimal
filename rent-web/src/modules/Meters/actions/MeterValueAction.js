export const GET_METER_VALUES = 'GET_METER_VALUES';
export const GET_METER_VALUES_SUCCESS = 'GET_METER_VALUES_SUCCESS';
export const GET_METER_VALUES_FAILED = 'GET_METER_VALUES_FAILED';
export const GET_METER_VALUE = 'GET_METER_VALUE';
export const GET_METER_VALUE_SUCCESS = 'GET_METER_VALUE_SUCCESS';
export const GET_METER_VALUE_FAILED = 'GET_METER_VALUE_FAILED';
export const SAVE_METER_VALUE = 'SAVE_METER_VALUE';
export const SAVE_METER_VALUE_SUCCESS = 'SAVE_METER_VALUE_SUCCESS';
export const SAVE_METER_VALUE_FAILED = 'SAVE_METER_VALUE_FAILED';
export const DELETE_METER_VALUE = 'DELETE_METER_VALUE';
export const DELETE_METER_VALUE_SUCCESS = 'DELETE_METER_VALUE_SUCCESS';
export const DELETE_METER_VALUE_FAILED = 'DELETE_METER_VALUE_FAILED';
export const NEW_METER_VALUE = 'NEW_METER_VALUE';

export const getMeterValues = (page = 0) => {
  return {
    type: GET_METER_VALUES,
    page,
  };
};

export const getMeterValuesSuccess = (data) => {
  return {
    type: GET_METER_VALUES_SUCCESS,
    data,
  };
};

export const getMeterValuesFailed = () => {
  return {
    type: GET_METER_VALUES_FAILED,
  };
};

export const getMeterValue = (id) => {
  return {
    type: GET_METER_VALUE,
    id,
  };
};

export const getMeterValueSuccess = (data) => {
  return {
    type: GET_METER_VALUE_SUCCESS,
    data,
  };
};

export const getMeterValueFailed = (id) => {
  return {
    type: GET_METER_VALUE_FAILED,
    id,
  };
};

export const saveMeterValue = (object) => {
  return {
    type: SAVE_METER_VALUE,
    object,
  };
};

export const saveMeterValueSuccess = (data) => {
  return {
    type: SAVE_METER_VALUE_SUCCESS,
    data,
  };
};

export const saveMeterValueFailed = (data) => {
  return {
    type: SAVE_METER_VALUE_FAILED,
    data,
  };
};

export const deleteMeterValue = (object) => {
  return {
    type: DELETE_METER_VALUE,
    object,
  };
};

export const deleteMeterValueSuccess = (object) => {
  return {
    type: DELETE_METER_VALUE_SUCCESS,
    object,
  };
};

export const deleteMeterValueFailed = (data) => {
  return {
    type: DELETE_METER_VALUE_FAILED,
    data,
  };
};

export const newMeterValue = () => {
  return {
    type: NEW_METER_VALUE,
  };
};
