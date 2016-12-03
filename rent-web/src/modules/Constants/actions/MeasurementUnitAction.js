export const GET_MEASUREMENT_UNITS = 'GET_MEASUREMENT_UNITS';
export const GET_MEASUREMENT_UNITS_SUCCESS = 'GET_MEASUREMENT_UNITS_SUCCESS';
export const GET_MEASUREMENT_UNITS_FAILED = 'GET_MEASUREMENT_UNITS_FAILED';
export const GET_MEASUREMENT_UNIT = 'GET_MEASUREMENT_UNIT';
export const GET_MEASUREMENT_UNIT_SUCCESS = 'GET_MEASUREMENT_UNIT_SUCCESS';
export const GET_MEASUREMENT_UNIT_FAILED = 'GET_MEASUREMENT_UNIT_FAILED';
export const SAVE_MEASUREMENT_UNIT = 'SAVE_MEASUREMENT_UNIT';
export const SAVE_MEASUREMENT_UNIT_SUCCESS = 'SAVE_MEASUREMENT_UNIT_SUCCESS';
export const SAVE_MEASUREMENT_UNIT_FAILED = 'SAVE_MEASUREMENT_UNIT_FAILED';
export const DELETE_MEASUREMENT_UNIT = 'DELETE_MEASUREMENT_UNIT';
export const DELETE_MEASUREMENT_UNIT_SUCCESS = 'DELETE_MEASUREMENT_UNIT_SUCCESS';
export const DELETE_MEASUREMENT_UNIT_FAILED = 'DELETE_MEASUREMENT_UNIT_FAILED';
export const NEW_MEASUREMENT_UNIT = 'NEW_MEASUREMENT_UNIT';
export const FIND_MEASUREMENT_UNITS_BY_NAME = 'FIND_MEASUREMENT_UNITS_BY_NAME';

export const getMeasurementUnits = (page = 0) => {
  return {
    type: GET_MEASUREMENT_UNITS,
    page,
  };
};

export const getMeasurementUnitsSuccess = (data) => {
  return {
    type: GET_MEASUREMENT_UNITS_SUCCESS,
    data,
  };
};

export const getMeasurementUnitsFailed = () => {
  return {
    type: GET_MEASUREMENT_UNITS_FAILED,
  };
};

export const getMeasurementUnit = (id) => {
  return {
    type: GET_MEASUREMENT_UNIT,
    id,
  };
};

export const getMeasurementUnitSuccess = (data) => {
  return {
    type: GET_MEASUREMENT_UNIT_SUCCESS,
    data,
  };
};

export const getMeasurementUnitFailed = (id) => {
  return {
    type: GET_MEASUREMENT_UNIT_FAILED,
    id,
  };
};

export const saveMeasurementUnit = (object) => {
  return {
    type: SAVE_MEASUREMENT_UNIT,
    object,
  };
};

export const saveMeasurementUnitSuccess = (data) => {
  return {
    type: SAVE_MEASUREMENT_UNIT_SUCCESS,
    data,
  };
};

export const saveMeasurementUnitFailed = (data) => {
  return {
    type: SAVE_MEASUREMENT_UNIT_FAILED,
    data,
  };
};

export const deleteMeasurementUnit = (object) => {
  return {
    type: DELETE_MEASUREMENT_UNIT,
    object,
  };
};

export const deleteMeasurementUnitSuccess = (object) => {
  return {
    type: DELETE_MEASUREMENT_UNIT_SUCCESS,
    object,
  };
};

export const deleteMeasurementUnitFailed = (data) => {
  return {
    type: DELETE_MEASUREMENT_UNIT_FAILED,
    data,
  };
};

export const newMeasurementUnit = () => {
  return {
    type: NEW_MEASUREMENT_UNIT,
  };
};

export const findMeasurementUnitsByName = (name = '') => {
  return {
    type: FIND_MEASUREMENT_UNITS_BY_NAME,
    name,
  };
};
