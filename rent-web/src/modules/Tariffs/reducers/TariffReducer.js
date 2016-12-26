import * as TariffAction from './../actions/TariffAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

export const tariffReducer = (state, action) => {
  switch (action.type) {
    case TariffAction.GET_TARIFF:
    case TariffAction.SAVE_TARIFF: {
      return prepareEdit(state.tariff.edit.data, true, false, false, false);
    }
    case TariffAction.FIND_TARIFFS_BY_NAME:
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
      return prepareEdit(state.tariff.edit.data, false, true, false, false);
    }
    case TariffAction.DELETE_TARIFF_FAILED: {
      return prepareList(state.tariff.list.data, emptyEditData, false, true, false, false);
    }

    case TariffAction.NEW_TARIFF: {
      return prepareEdit(emptyEditData, false, false, false, false);
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
