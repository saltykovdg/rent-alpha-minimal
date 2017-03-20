export const GET_METER_TYPES = 'GET_METER_TYPES';
export const GET_METER_TYPES_SUCCESS = 'GET_METER_TYPES_SUCCESS';
export const GET_METER_TYPES_FAILED = 'GET_METER_TYPES_FAILED';
export const GET_METER_TYPE = 'GET_METER_TYPE';
export const GET_METER_TYPE_SUCCESS = 'GET_METER_TYPE_SUCCESS';
export const GET_METER_TYPE_FAILED = 'GET_METER_TYPE_FAILED';
export const SAVE_METER_TYPE = 'SAVE_METER_TYPE';
export const SAVE_METER_TYPE_SUCCESS = 'SAVE_METER_TYPE_SUCCESS';
export const SAVE_METER_TYPE_FAILED = 'SAVE_METER_TYPE_FAILED';
export const DELETE_METER_TYPE = 'DELETE_METER_TYPE';
export const DELETE_METER_TYPE_SUCCESS = 'DELETE_METER_TYPE_SUCCESS';
export const DELETE_METER_TYPE_FAILED = 'DELETE_METER_TYPE_FAILED';
export const NEW_METER_TYPE = 'NEW_METER_TYPE';
export const FIND_METER_TYPES_BY_NAME = 'FIND_METER_TYPES_BY_NAME';

export const getMeterTypes = (page = 0) => {
  return {
    type: GET_METER_TYPES,
    page,
  };
};

export const getMeterTypesSuccess = (data) => {
  return {
    type: GET_METER_TYPES_SUCCESS,
    data,
  };
};

export const getMeterTypesFailed = () => {
  return {
    type: GET_METER_TYPES_FAILED,
  };
};

export const getMeterType = (id) => {
  return {
    type: GET_METER_TYPE,
    id,
  };
};

export const getMeterTypeSuccess = (data) => {
  return {
    type: GET_METER_TYPE_SUCCESS,
    data,
  };
};

export const getMeterTypeFailed = (id) => {
  return {
    type: GET_METER_TYPE_FAILED,
    id,
  };
};

export const saveMeterType = (object) => {
  return {
    type: SAVE_METER_TYPE,
    object,
  };
};

export const saveMeterTypeSuccess = (data) => {
  return {
    type: SAVE_METER_TYPE_SUCCESS,
    data,
  };
};

export const saveMeterTypeFailed = (data) => {
  return {
    type: SAVE_METER_TYPE_FAILED,
    data,
  };
};

export const deleteMeterType = (object) => {
  return {
    type: DELETE_METER_TYPE,
    object,
  };
};

export const deleteMeterTypeSuccess = (object) => {
  return {
    type: DELETE_METER_TYPE_SUCCESS,
    object,
  };
};

export const deleteMeterTypeFailed = (data) => {
  return {
    type: DELETE_METER_TYPE_FAILED,
    data,
  };
};

export const newMeterType = () => {
  return {
    type: NEW_METER_TYPE,
  };
};

export const findMeterTypesByName = (name = '') => {
  return {
    type: FIND_METER_TYPES_BY_NAME,
    name,
  };
};
