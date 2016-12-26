export const GET_TARIFF_VALUES = 'GET_TARIFF_VALUES';
export const GET_TARIFF_VALUES_SUCCESS = 'GET_TARIFF_VALUES_SUCCESS';
export const GET_TARIFF_VALUES_FAILED = 'GET_TARIFF_VALUES_FAILED';
export const GET_TARIFF_VALUE = 'GET_TARIFF_VALUE';
export const GET_TARIFF_VALUE_SUCCESS = 'GET_TARIFF_VALUE_SUCCESS';
export const GET_TARIFF_VALUE_FAILED = 'GET_TARIFF_VALUE_FAILED';
export const SAVE_TARIFF_VALUE = 'SAVE_TARIFF_VALUE';
export const SAVE_TARIFF_VALUE_SUCCESS = 'SAVE_TARIFF_VALUE_SUCCESS';
export const SAVE_TARIFF_VALUE_FAILED = 'SAVE_TARIFF_VALUE_FAILED';
export const DELETE_TARIFF_VALUE = 'DELETE_TARIFF_VALUE';
export const DELETE_TARIFF_VALUE_SUCCESS = 'DELETE_TARIFF_VALUE_SUCCESS';
export const DELETE_TARIFF_VALUE_FAILED = 'DELETE_TARIFF_VALUE_FAILED';
export const NEW_TARIFF_VALUE = 'NEW_TARIFF_VALUE';

export const getTariffValues = (page = 0) => {
  return {
    type: GET_TARIFF_VALUES,
    page,
  };
};

export const getTariffValuesSuccess = (data) => {
  return {
    type: GET_TARIFF_VALUES_SUCCESS,
    data,
  };
};

export const getTariffValuesFailed = () => {
  return {
    type: GET_TARIFF_VALUES_FAILED,
  };
};

export const getTariffValue = (id) => {
  return {
    type: GET_TARIFF_VALUE,
    id,
  };
};

export const getTariffValueSuccess = (data) => {
  return {
    type: GET_TARIFF_VALUE_SUCCESS,
    data,
  };
};

export const getTariffValueFailed = (id) => {
  return {
    type: GET_TARIFF_VALUE_FAILED,
    id,
  };
};

export const saveTariffValue = (object) => {
  return {
    type: SAVE_TARIFF_VALUE,
    object,
  };
};

export const saveTariffValueSuccess = (data) => {
  return {
    type: SAVE_TARIFF_VALUE_SUCCESS,
    data,
  };
};

export const saveTariffValueFailed = (data) => {
  return {
    type: SAVE_TARIFF_VALUE_FAILED,
    data,
  };
};

export const deleteTariffValue = (object) => {
  return {
    type: DELETE_TARIFF_VALUE,
    object,
  };
};

export const deleteTariffValueSuccess = (object) => {
  return {
    type: DELETE_TARIFF_VALUE_SUCCESS,
    object,
  };
};

export const deleteTariffValueFailed = (data) => {
  return {
    type: DELETE_TARIFF_VALUE_FAILED,
    data,
  };
};

export const newTariffValue = () => {
  return {
    type: NEW_TARIFF_VALUE,
  };
};
