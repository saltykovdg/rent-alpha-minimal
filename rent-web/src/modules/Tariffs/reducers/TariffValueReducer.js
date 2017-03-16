import * as TariffValueAction from './../actions/TariffValueAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const tariffValueReducer = (state, action) => {
  switch (action.type) {
    case TariffValueAction.GET_TARIFF_VALUE:
    case TariffValueAction.SAVE_TARIFF_VALUE: {
      return prepareEdit(state.tariffValue.edit.data, true, false, false, false);
    }
    case TariffValueAction.GET_TARIFF_VALUES:
    case TariffValueAction.DELETE_TARIFF_VALUE: {
      return prepareList(state.tariffValue.list.data, emptyEditData, true, false, false, false);
    }

    case TariffValueAction.GET_TARIFF_VALUE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case TariffValueAction.GET_TARIFF_VALUES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case TariffValueAction.GET_TARIFF_VALUE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case TariffValueAction.GET_TARIFF_VALUES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case TariffValueAction.SAVE_TARIFF_VALUE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case TariffValueAction.DELETE_TARIFF_VALUE_SUCCESS: {
      return prepareList(state.tariffValue.list.data, emptyEditData, false, false, false, true);
    }

    case TariffValueAction.SAVE_TARIFF_VALUE_FAILED: {
      return prepareEdit(state.tariffValue.edit.data, false, true, false, false);
    }
    case TariffValueAction.DELETE_TARIFF_VALUE_FAILED: {
      return prepareList(state.tariffValue.list.data, emptyEditData, false, true, false, false);
    }

    case TariffValueAction.NEW_TARIFF_VALUE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.tariffValue.list, emptyEditData);
  }
};

/* Selectors */
export const getTariffValueEditData = state => state.tariffs.tariffValue.edit.data;
export const getTariffValueListData = state => state.tariffs.tariffValue.list.data;
export const getTariffValueIsLoading = state => state.tariffs.tariffValue.list.isLoading || state.tariffs.tariffValue.edit.isLoading;
export const getTariffValueIsRequestError = state => state.tariffs.tariffValue.list.isRequestError || state.tariffs.tariffValue.edit.isRequestError;
export const getTariffValueIsSaved = state => state.tariffs.tariffValue.isSaved;
export const getTariffValueIsDeleted = state => state.tariffs.tariffValue.isDeleted;
