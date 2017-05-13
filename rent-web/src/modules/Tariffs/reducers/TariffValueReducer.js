import * as TariffValueAction from './../actions/TariffValueAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const tariffValueReducer = (state, action) => {
  switch (action.type) {
    case TariffValueAction.GET_TARIFF_VALUE: {
      return prepareEditLoading(state.tariffValue.list.data, emptyEditData);
    }
    case TariffValueAction.SAVE_TARIFF_VALUE: {
      return prepareEditLoading(state.tariffValue.list.data, state.tariffValue.edit.data);
    }
    case TariffValueAction.GET_TARIFF_VALUES:
    case TariffValueAction.DELETE_TARIFF_VALUE: {
      return prepareListLoading(state.tariffValue.list.data, emptyEditData);
    }

    case TariffValueAction.GET_TARIFF_VALUE_SUCCESS: {
      return prepareSuccess(state.tariffValue.list.data, action.data);
    }
    case TariffValueAction.GET_TARIFF_VALUES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case TariffValueAction.GET_TARIFF_VALUE_FAILED: {
      return prepareEditFailed(state.tariffValue.list.data, emptyEditData);
    }
    case TariffValueAction.GET_TARIFF_VALUES_FAILED: {
      return prepareListFailed(state.tariffValue.list.data, emptyEditData);
    }

    case TariffValueAction.SAVE_TARIFF_VALUE_SUCCESS: {
      return prepareSaveSuccess(state.tariffValue.list.data, emptyEditData);
    }
    case TariffValueAction.DELETE_TARIFF_VALUE_SUCCESS: {
      return prepareDeleteSuccess(state.tariffValue.list.data, emptyEditData);
    }

    case TariffValueAction.SAVE_TARIFF_VALUE_FAILED: {
      return prepareEditFailed(state.tariffValue.list.data, state.tariffValue.edit.data);
    }
    case TariffValueAction.DELETE_TARIFF_VALUE_FAILED: {
      return prepareListFailed(state.tariffValue.list.data, emptyEditData);
    }

    case TariffValueAction.NEW_TARIFF_VALUE: {
      return prepareSuccess(state.tariffValue.list.data, emptyEditData);
    }

    default:
      return state.tariffValue;
  }
};

/* Selectors */
export const getTariffValueEditData = state => state.tariffs.tariffValue.edit.data;
export const getTariffValueListData = state => state.tariffs.tariffValue.list.data;
export const getTariffValueIsLoading = state => state.tariffs.tariffValue.list.isLoading || state.tariffs.tariffValue.edit.isLoading;
export const getTariffValueIsRequestError = state => state.tariffs.tariffValue.list.isRequestError || state.tariffs.tariffValue.edit.isRequestError;
export const getTariffValueIsSaved = state => state.tariffs.tariffValue.isSaved;
export const getTariffValueIsDeleted = state => state.tariffs.tariffValue.isDeleted;
