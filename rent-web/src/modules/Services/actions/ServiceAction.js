export const GET_SERVICES = 'GET_SERVICES';
export const GET_SERVICES_SUCCESS = 'GET_SERVICES_SUCCESS';
export const GET_SERVICES_FAILED = 'GET_SERVICES_FAILED';
export const GET_SERVICE = 'GET_SERVICE';
export const GET_SERVICE_SUCCESS = 'GET_SERVICE_SUCCESS';
export const GET_SERVICE_FAILED = 'GET_SERVICE_FAILED';
export const SAVE_SERVICE = 'SAVE_SERVICE';
export const SAVE_SERVICE_SUCCESS = 'SAVE_SERVICE_SUCCESS';
export const SAVE_SERVICE_FAILED = 'SAVE_SERVICE_FAILED';
export const DELETE_SERVICE = 'DELETE_SERVICE';
export const DELETE_SERVICE_SUCCESS = 'DELETE_SERVICE_SUCCESS';
export const DELETE_SERVICE_FAILED = 'DELETE_SERVICE_FAILED';
export const NEW_SERVICE = 'NEW_SERVICE';
export const FIND_SERVICES_BY_NAME = 'FIND_SERVICES_BY_NAME';

export const getServices = (page = 0) => {
  return {
    type: GET_SERVICES,
    page,
  };
};

export const getServicesSuccess = (data) => {
  return {
    type: GET_SERVICES_SUCCESS,
    data,
  };
};

export const getServicesFailed = () => {
  return {
    type: GET_SERVICES_FAILED,
  };
};

export const getService = (id) => {
  return {
    type: GET_SERVICE,
    id,
  };
};

export const getServiceSuccess = (data) => {
  return {
    type: GET_SERVICE_SUCCESS,
    data,
  };
};

export const getServiceFailed = (id) => {
  return {
    type: GET_SERVICE_FAILED,
    id,
  };
};

export const saveService = (object) => {
  return {
    type: SAVE_SERVICE,
    object,
  };
};

export const saveServiceSuccess = (data) => {
  return {
    type: SAVE_SERVICE_SUCCESS,
    data,
  };
};

export const saveServiceFailed = (data) => {
  return {
    type: SAVE_SERVICE_FAILED,
    data,
  };
};

export const deleteService = (object) => {
  return {
    type: DELETE_SERVICE,
    object,
  };
};

export const deleteServiceSuccess = (object) => {
  return {
    type: DELETE_SERVICE_SUCCESS,
    object,
  };
};

export const deleteServiceFailed = (data) => {
  return {
    type: DELETE_SERVICE_FAILED,
    data,
  };
};

export const newService = () => {
  return {
    type: NEW_SERVICE,
  };
};

export const findServicesByName = (name = '') => {
  return {
    type: FIND_SERVICES_BY_NAME,
    name,
  };
};
