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

export const saveTariffFailed = (data) => {
  return {
    type: SAVE_TARIFF_FAILED,
    data,
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
