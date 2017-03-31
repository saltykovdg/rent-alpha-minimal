export const GET_CONTRACTOR_TYPES = 'GET_CONTRACTOR_TYPES';
export const GET_CONTRACTORS = 'GET_CONTRACTORS';

export const GET_CONTRACTOR_TYPES_SUCCESS = 'GET_CONTRACTOR_TYPES_SUCCESS';
export const GET_CONTRACTORS_SUCCESS = 'GET_CONTRACTORS_SUCCESS';

export const GET_CONTRACTOR_TYPES_FAILED = 'GET_CONTRACTOR_TYPES_FAILED';
export const GET_CONTRACTORS_FAILED = 'GET_CONTRACTORS_FAILED';

export const GET_CONTRACTOR_TYPE = 'GET_CONTRACTOR_TYPE';
export const GET_CONTRACTOR = 'GET_CONTRACTOR';

export const GET_CONTRACTOR_TYPE_SUCCESS = 'GET_CONTRACTOR_TYPE_SUCCESS';
export const GET_CONTRACTOR_SUCCESS = 'GET_CONTRACTOR_SUCCESS';

export const GET_CONTRACTOR_TYPE_FAILED = 'GET_CONTRACTOR_TYPE_FAILED';
export const GET_CONTRACTOR_FAILED = 'GET_CONTRACTOR_FAILED';

export const SAVE_CONTRACTOR_TYPE = 'SAVE_CONTRACTOR_TYPE';
export const SAVE_CONTRACTOR = 'SAVE_CONTRACTOR';

export const SAVE_CONTRACTOR_TYPE_SUCCESS = 'SAVE_CONTRACTOR_TYPE_SUCCESS';
export const SAVE_CONTRACTOR_SUCCESS = 'SAVE_CONTRACTOR_SUCCESS';

export const SAVE_CONTRACTOR_TYPE_FAILED = 'SAVE_CONTRACTOR_TYPE_FAILED';
export const SAVE_CONTRACTOR_FAILED = 'SAVE_CONTRACTOR_FAILED';

export const DELETE_CONTRACTOR_TYPE = 'DELETE_CONTRACTOR_TYPE';
export const DELETE_CONTRACTOR = 'DELETE_CONTRACTOR';

export const DELETE_CONTRACTOR_TYPE_SUCCESS = 'DELETE_CONTRACTOR_TYPE_SUCCESS';
export const DELETE_CONTRACTOR_SUCCESS = 'DELETE_CONTRACTOR_SUCCESS';

export const DELETE_CONTRACTOR_TYPE_FAILED = 'DELETE_CONTRACTOR_TYPE_FAILED';
export const DELETE_CONTRACTOR_FAILED = 'DELETE_CONTRACTOR_FAILED';

export const NEW_CONTRACTOR_TYPE = 'NEW_CONTRACTOR_TYPE';
export const NEW_CONTRACTOR = 'NEW_CONTRACTOR';

export const FIND_CONTRACTOR_TYPES_BY_NAME = 'FIND_CONTRACTOR_TYPES_BY_NAME';
export const FIND_CONTRACTORS_BY_NAME = 'FIND_CONTRACTORS_BY_NAME';

// get lists action creator
export const getContractorTypes = (page = 0) => {
  return {
    type: GET_CONTRACTOR_TYPES,
    page,
  };
};
export const getContractors = (page = 0) => {
  return {
    type: GET_CONTRACTORS,
    page,
  };
};

// get lists action creator success
export const getContractorTypesSuccess = (data) => {
  return {
    type: GET_CONTRACTOR_TYPES_SUCCESS,
    data,
  };
};
export const getContractorsSuccess = (data) => {
  return {
    type: GET_CONTRACTORS_SUCCESS,
    data,
  };
};

// get lists action creator failed
export const getContractorTypesFailed = () => {
  return {
    type: GET_CONTRACTOR_TYPES_FAILED,
  };
};
export const getContractorsFailed = () => {
  return {
    type: GET_CONTRACTORS_FAILED,
  };
};

// get by id action creator
export const getContractorType = (id) => {
  return {
    type: GET_CONTRACTOR_TYPE,
    id,
  };
};
export const getContractor = (id) => {
  return {
    type: GET_CONTRACTOR,
    id,
  };
};

// get by id action creator success
export const getContractorTypeSuccess = (data) => {
  return {
    type: GET_CONTRACTOR_TYPE_SUCCESS,
    data,
  };
};
export const getContractorSuccess = (data) => {
  return {
    type: GET_CONTRACTOR_SUCCESS,
    data,
  };
};

// get by id action creator failed
export const getContractorTypeFailed = (id) => {
  return {
    type: GET_CONTRACTOR_TYPE_FAILED,
    id,
  };
};
export const getContractorFailed = (id) => {
  return {
    type: GET_CONTRACTOR_FAILED,
    id,
  };
};

// save action creator
export const saveContractorType = (object) => {
  return {
    type: SAVE_CONTRACTOR_TYPE,
    object,
  };
};
export const saveContractor = (object) => {
  return {
    type: SAVE_CONTRACTOR,
    object,
  };
};

// save action creator success
export const saveContractorTypeSuccess = (data) => {
  return {
    type: SAVE_CONTRACTOR_TYPE_SUCCESS,
    data,
  };
};
export const saveContractorSuccess = (data) => {
  return {
    type: SAVE_CONTRACTOR_SUCCESS,
    data,
  };
};

// save action creator failed
export const saveContractorTypeFailed = (data) => {
  return {
    type: SAVE_CONTRACTOR_TYPE_FAILED,
    data,
  };
};
export const saveContractorFailed = (data) => {
  return {
    type: SAVE_CONTRACTOR_FAILED,
    data,
  };
};

// delete action creator
export const deleteContractorType = (object, page = 0) => {
  return {
    type: DELETE_CONTRACTOR_TYPE,
    object,
    page,
  };
};
export const deleteContractor = (object, page = 0) => {
  return {
    type: DELETE_CONTRACTOR,
    object,
    page,
  };
};

// delete action creator success
export const deleteContractorTypeSuccess = (object) => {
  return {
    type: DELETE_CONTRACTOR_TYPE_SUCCESS,
    object,
  };
};
export const deleteContractorSuccess = (object) => {
  return {
    type: DELETE_CONTRACTOR_SUCCESS,
    object,
  };
};

// delete action creator failed
export const deleteContractorTypeFailed = (data) => {
  return {
    type: DELETE_CONTRACTOR_TYPE_FAILED,
    data,
  };
};
export const deleteContractorFailed = (data) => {
  return {
    type: DELETE_CONTRACTOR_FAILED,
    data,
  };
};

// new record action creator
export const newContractorType = () => {
  return {
    type: NEW_CONTRACTOR_TYPE,
  };
};
export const newContractor = () => {
  return {
    type: NEW_CONTRACTOR,
  };
};

// find
export const findContractorTypesByName = (name = '') => {
  return {
    type: FIND_CONTRACTOR_TYPES_BY_NAME,
    name,
  };
};
export const findContractorsByName = (name = '') => {
  return {
    type: FIND_CONTRACTORS_BY_NAME,
    name,
  };
};
