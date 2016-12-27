import moment from 'moment';

import * as TariffAction from './../actions/TariffAction';
import * as TariffValueAction from './../actions/TariffValueAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

export const getDefaultTariffValue = () => {
  return {
    id: '',
    calculationType: {
      id: '',
      name: '',
    },
    measurementUnit: {
      id: '',
      name: '',
    },
    value: 0,
    dateStart: moment(),
    dateEnd: null,
  };
};

const emptyEditData = {
  id: '',
  name: '',
  values: [],
};

export const tariffReducer = (state, action) => {
  switch (action.type) {
    case TariffAction.GET_TARIFF:
    case TariffAction.SAVE_TARIFF: {
      return prepareEdit(state.tariff.edit.data, true, false, false, false);
    }
    case TariffAction.FIND_TARIFFS_BY_NAME:
    case TariffAction.FIND_TARIFFS_BY_SERVICE_ID:
    case TariffAction.GET_TARIFFS:
    case TariffAction.DELETE_TARIFF: {
      return prepareList(state.tariff.list.data, emptyEditData, true, false, false, false);
    }

    case TariffAction.GET_TARIFF_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case TariffAction.GET_TARIFFS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case TariffAction.GET_TARIFF_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case TariffAction.GET_TARIFFS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case TariffAction.SAVE_TARIFF_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case TariffAction.DELETE_TARIFF_SUCCESS: {
      return prepareList(state.tariff.list.data, emptyEditData, false, false, false, true);
    }

    case TariffAction.SAVE_TARIFF_FAILED: {
      return prepareEdit(state.tariff.edit.data, false, action.showError, false, false);
    }
    case TariffAction.DELETE_TARIFF_FAILED: {
      return prepareList(state.tariff.list.data, emptyEditData, false, true, false, false);
    }

    case TariffAction.NEW_TARIFF: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    case TariffAction.ADD_NEW_VALUE_TO_TARIFF: {
      const newObj = state.tariff.edit.data;
      newObj.values.push(action.tariffValue);
      return prepareEdit(newObj, false, false, false, false);
    }

    case TariffAction.EDIT_VALUE_IN_TARIFF: {
      const newObj = state.tariff.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.tariffValue.id);
      newObj.values.push(action.tariffValue);
      return prepareEdit(newObj, false, false, false, false);
    }

    case TariffAction.REMOVE_VALUE_FROM_TARIF: {
      const newObj = state.tariff.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.tariffValue.id);
      return prepareEdit(newObj, false, false, false, false);
    }

    case TariffValueAction.SAVE_TARIFF_VALUE:
    case TariffValueAction.SAVE_TARIFF_VALUE_SUCCESS:
    case TariffValueAction.SAVE_TARIFF_VALUE_FAILED: {
      return state.tariff;
    }

    default:
      return prepareDefault(state.tariff.list, emptyEditData);
  }
};

/* Selectors */
export const getTariffEditData = state => state.tariffs.tariff.edit.data;
export const getTariffListData = state => state.tariffs.tariff.list.data;
export const getTariffIsLoading = state => state.tariffs.tariff.list.isLoading || state.tariffs.tariff.edit.isLoading;
export const getTariffIsRequestError = state => state.tariffs.tariff.list.isRequestError || state.tariffs.tariff.edit.isRequestError;
export const getTariffIsSaved = state => state.tariffs.tariff.isSaved;
export const getTariffIsDeleted = state => state.tariffs.tariff.isDeleted;
