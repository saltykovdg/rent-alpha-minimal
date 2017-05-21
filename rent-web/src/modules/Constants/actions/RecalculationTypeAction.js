export const GET_RECALCULATION_TYPES = 'GET_RECALCULATION_TYPES';
export const GET_RECALCULATION_TYPES_SUCCESS = 'GET_RECALCULATION_TYPES_SUCCESS';
export const GET_RECALCULATION_TYPES_FAILED = 'GET_RECALCULATION_TYPES_FAILED';
export const GET_RECALCULATION_TYPE = 'GET_RECALCULATION_TYPE';
export const GET_RECALCULATION_TYPE_SUCCESS = 'GET_RECALCULATION_TYPE_SUCCESS';
export const GET_RECALCULATION_TYPE_FAILED = 'GET_RECALCULATION_TYPE_FAILED';
export const SAVE_RECALCULATION_TYPE = 'SAVE_RECALCULATION_TYPE';
export const SAVE_RECALCULATION_TYPE_SUCCESS = 'SAVE_RECALCULATION_TYPE_SUCCESS';
export const SAVE_RECALCULATION_TYPE_FAILED = 'SAVE_RECALCULATION_TYPE_FAILED';
export const DELETE_RECALCULATION_TYPE = 'DELETE_RECALCULATION_TYPE';
export const DELETE_RECALCULATION_TYPE_SUCCESS = 'DELETE_RECALCULATION_TYPE_SUCCESS';
export const DELETE_RECALCULATION_TYPE_FAILED = 'DELETE_RECALCULATION_TYPE_FAILED';
export const NEW_RECALCULATION_TYPE = 'NEW_RECALCULATION_TYPE';
export const FIND_RECALCULATION_TYPES_BY_NAME = 'FIND_RECALCULATION_TYPES_BY_NAME';

export const getRecalculationTypes = (page = 0) => {
  return {
    type: GET_RECALCULATION_TYPES,
    page,
  };
};

export const getRecalculationTypesSuccess = (data) => {
  return {
    type: GET_RECALCULATION_TYPES_SUCCESS,
    data,
  };
};

export const getRecalculationTypesFailed = () => {
  return {
    type: GET_RECALCULATION_TYPES_FAILED,
  };
};

export const getRecalculationType = (id) => {
  return {
    type: GET_RECALCULATION_TYPE,
    id,
  };
};

export const getRecalculationTypeSuccess = (data) => {
  return {
    type: GET_RECALCULATION_TYPE_SUCCESS,
    data,
  };
};

export const getRecalculationTypeFailed = (id) => {
  return {
    type: GET_RECALCULATION_TYPE_FAILED,
    id,
  };
};

export const saveRecalculationType = (object) => {
  return {
    type: SAVE_RECALCULATION_TYPE,
    object,
  };
};

export const saveRecalculationTypeSuccess = (data) => {
  return {
    type: SAVE_RECALCULATION_TYPE_SUCCESS,
    data,
  };
};

export const saveRecalculationTypeFailed = (data) => {
  return {
    type: SAVE_RECALCULATION_TYPE_FAILED,
    data,
  };
};

export const deleteRecalculationType = (object, page = 0) => {
  return {
    type: DELETE_RECALCULATION_TYPE,
    object,
    page,
  };
};

export const deleteRecalculationTypeSuccess = (object) => {
  return {
    type: DELETE_RECALCULATION_TYPE_SUCCESS,
    object,
  };
};

export const deleteRecalculationTypeFailed = (data) => {
  return {
    type: DELETE_RECALCULATION_TYPE_FAILED,
    data,
  };
};

export const newRecalculationType = () => {
  return {
    type: NEW_RECALCULATION_TYPE,
  };
};

export const findRecalculationTypesByName = (name = '') => {
  return {
    type: FIND_RECALCULATION_TYPES_BY_NAME,
    name,
  };
};
