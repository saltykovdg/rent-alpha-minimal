export const GET_CALCULATION_TYPES = 'GET_CALCULATION_TYPES';
export const GET_CALCULATION_TYPES_SUCCESS = 'GET_CALCULATION_TYPES_SUCCESS';
export const GET_CALCULATION_TYPES_FAILED = 'GET_CALCULATION_TYPES_FAILED';
export const GET_CALCULATION_TYPE = 'GET_CALCULATION_TYPE';
export const GET_CALCULATION_TYPE_SUCCESS = 'GET_CALCULATION_TYPE_SUCCESS';
export const GET_CALCULATION_TYPE_FAILED = 'GET_CALCULATION_TYPE_FAILED';
export const SAVE_CALCULATION_TYPE = 'SAVE_CALCULATION_TYPE';
export const SAVE_CALCULATION_TYPE_SUCCESS = 'SAVE_CALCULATION_TYPE_SUCCESS';
export const SAVE_CALCULATION_TYPE_FAILED = 'SAVE_CALCULATION_TYPE_FAILED';
export const DELETE_CALCULATION_TYPE = 'DELETE_CALCULATION_TYPE';
export const DELETE_CALCULATION_TYPE_SUCCESS = 'DELETE_CALCULATION_TYPE_SUCCESS';
export const DELETE_CALCULATION_TYPE_FAILED = 'DELETE_CALCULATION_TYPE_FAILED';
export const NEW_CALCULATION_TYPE = 'NEW_CALCULATION_TYPE';
export const FIND_CALCULATION_TYPES_BY_NAME = 'FIND_CALCULATION_TYPES_BY_NAME';

export const getCalculationTypes = (page = 0) => {
  return {
    type: GET_CALCULATION_TYPES,
    page,
  };
};

export const getCalculationTypesSuccess = (data) => {
  return {
    type: GET_CALCULATION_TYPES_SUCCESS,
    data,
  };
};

export const getCalculationTypesFailed = () => {
  return {
    type: GET_CALCULATION_TYPES_FAILED,
  };
};

export const getCalculationType = (id) => {
  return {
    type: GET_CALCULATION_TYPE,
    id,
  };
};

export const getCalculationTypeSuccess = (data) => {
  return {
    type: GET_CALCULATION_TYPE_SUCCESS,
    data,
  };
};

export const getCalculationTypeFailed = (id) => {
  return {
    type: GET_CALCULATION_TYPE_FAILED,
    id,
  };
};

export const saveCalculationType = (object) => {
  return {
    type: SAVE_CALCULATION_TYPE,
    object,
  };
};

export const saveCalculationTypeSuccess = (data) => {
  return {
    type: SAVE_CALCULATION_TYPE_SUCCESS,
    data,
  };
};

export const saveCalculationTypeFailed = (data) => {
  return {
    type: SAVE_CALCULATION_TYPE_FAILED,
    data,
  };
};

export const deleteCalculationType = (object) => {
  return {
    type: DELETE_CALCULATION_TYPE,
    object,
  };
};

export const deleteCalculationTypeSuccess = (object) => {
  return {
    type: DELETE_CALCULATION_TYPE_SUCCESS,
    object,
  };
};

export const deleteCalculationTypeFailed = (data) => {
  return {
    type: DELETE_CALCULATION_TYPE_FAILED,
    data,
  };
};

export const newCalculationType = () => {
  return {
    type: NEW_CALCULATION_TYPE,
  };
};

export const findCalculationTypesByName = (name = '') => {
  return {
    type: FIND_CALCULATION_TYPES_BY_NAME,
    name,
  };
};
