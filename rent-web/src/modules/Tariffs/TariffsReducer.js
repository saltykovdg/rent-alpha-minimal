import {
  tariffReducer,
  getTariffIsLoading,
  getTariffIsRequestError,
} from './reducers/TariffReducer';

import {
  tariffValueReducer,
  getTariffValueIsLoading,
  getTariffValueIsRequestError,
} from './reducers/TariffValueReducer';

// Initial State
const data = {
  list: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  edit: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  isSaved: false,
  isDeleted: false,
};

const initialState = {
  tariff: data,
  tariffValue: data,
};

const TariffsReducer = (state = initialState, action) => {
  return {
    tariff: tariffReducer(state, action),
    tariffValue: tariffValueReducer(state, action),
  };
};

/* Selectors */
export const getIsRequestError = state => getTariffIsRequestError(state) || getTariffValueIsRequestError(state);
export const getIsLoading = state => getTariffIsLoading(state) || getTariffValueIsLoading(state);

// Export Reducer
export default TariffsReducer;
