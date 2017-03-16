export const GET_TARIFFS = 'GET_TARIFFS';
export const GET_TARIFFS_SUCCESS = 'GET_TARIFFS_SUCCESS';
export const GET_TARIFFS_FAILED = 'GET_TARIFFS_FAILED';
export const GET_TARIFF = 'GET_TARIFF';
export const GET_TARIFF_SUCCESS = 'GET_TARIFF_SUCCESS';
export const GET_TARIFF_FAILED = 'GET_TARIFF_FAILED';
export const SAVE_TARIFF = 'SAVE_TARIFF';
export const SAVE_TARIFF_SUCCESS = 'SAVE_TARIFF_SUCCESS';
export const SAVE_TARIFF_FAILED = 'SAVE_TARIFF_FAILED';
export const DELETE_TARIFF = 'DELETE_TARIFF';
export const DELETE_TARIFF_SUCCESS = 'DELETE_TARIFF_SUCCESS';
export const DELETE_TARIFF_FAILED = 'DELETE_TARIFF_FAILED';
export const NEW_TARIFF = 'NEW_TARIFF';
export const FIND_TARIFFS_BY_NAME = 'FIND_TARIFFS_BY_NAME';
export const FIND_TARIFFS_BY_SERVICE_ID = 'FIND_TARIFFS_BY_SERVICE_ID';

// tariff values
export const ADD_NEW_VALUE_TO_TARIFF = 'ADD_NEW_VALUE_TO_TARIFF';
export const EDIT_VALUE_IN_TARIFF = 'EDIT_VALUE_IN_TARIFF';
export const REMOVE_VALUE_FROM_TARIFF = 'REMOVE_VALUE_FROM_TARIFF';

export const getTariffs = (page = 0) => {
  return {
    type: GET_TARIFFS,
    page,
  };
};

export const getTariffsSuccess = (data) => {
  return {
    type: GET_TARIFFS_SUCCESS,
    data,
  };
};

export const getTariffsFailed = () => {
  return {
    type: GET_TARIFFS_FAILED,
  };
};

export const getTariff = (id) => {
  return {
    type: GET_TARIFF,
    id,
  };
};

export const getTariffSuccess = (data) => {
  return {
    type: GET_TARIFF_SUCCESS,
    data,
  };
};

export const getTariffFailed = (id) => {
  return {
    type: GET_TARIFF_FAILED,
    id,
  };
};

export const saveTariff = (object) => {
  return {
    type: SAVE_TARIFF,
    object,
  };
};

export const saveTariffSuccess = (data) => {
  return {
    type: SAVE_TARIFF_SUCCESS,
    data,
  };
};

export const saveTariffFailed = (data, showError = true) => {
  return {
    type: SAVE_TARIFF_FAILED,
    data,
    showError,
  };
};

export const deleteTariff = (object) => {
  return {
    type: DELETE_TARIFF,
    object,
  };
};

export const deleteTariffSuccess = (object) => {
  return {
    type: DELETE_TARIFF_SUCCESS,
    object,
  };
};

export const deleteTariffFailed = (data) => {
  return {
    type: DELETE_TARIFF_FAILED,
    data,
  };
};

export const newTariff = () => {
  return {
    type: NEW_TARIFF,
  };
};

export const findTariffsByName = (name = '') => {
  return {
    type: FIND_TARIFFS_BY_NAME,
    name,
  };
};
export const findTariffsByServiceId = (serviceId = '') => {
  return {
    type: FIND_TARIFFS_BY_SERVICE_ID,
    serviceId,
  };
};

// tariff values
export const addNewValueToTariff = (tariffValue) => {
  return {
    type: ADD_NEW_VALUE_TO_TARIFF,
    tariffValue,
  };
};
export const editValueInTariff = (tariffValue) => {
  return {
    type: EDIT_VALUE_IN_TARIFF,
    tariffValue,
  };
};
export const removeValueFromTariff = (tariffValue) => {
  return {
    type: REMOVE_VALUE_FROM_TARIFF,
    tariffValue,
  };
};
