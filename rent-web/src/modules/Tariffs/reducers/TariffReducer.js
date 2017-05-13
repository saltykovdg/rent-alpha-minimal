import * as TariffAction from './../actions/TariffAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

export const emptyTariffValue = {
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
  dateStart: null,
  dateEnd: null,
};

const emptyEditData = {
  id: '',
  name: '',
  values: [],
};

export const tariffReducer = (state, action) => {
  switch (action.type) {
    case TariffAction.GET_TARIFF: {
      return prepareEditLoading(state.tariff.list.data, emptyEditData);
    }
    case TariffAction.SAVE_TARIFF: {
      return prepareEditLoading(state.tariff.list.data, state.tariff.edit.data);
    }
    case TariffAction.FIND_TARIFFS_BY_SERVICE_ID:
    case TariffAction.GET_TARIFFS:
    case TariffAction.DELETE_TARIFF: {
      return prepareListLoading(state.tariff.list.data, emptyEditData);
    }

    case TariffAction.GET_TARIFF_SUCCESS: {
      return prepareSuccess(state.tariff.list.data, action.data);
    }
    case TariffAction.GET_TARIFFS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case TariffAction.GET_TARIFF_FAILED: {
      return prepareEditFailed(state.tariff.list.data, emptyEditData);
    }
    case TariffAction.GET_TARIFFS_FAILED: {
      return prepareListFailed(state.tariff.list.data, emptyEditData);
    }

    case TariffAction.SAVE_TARIFF_SUCCESS: {
      return prepareSaveSuccess(state.tariff.list.data, emptyEditData);
    }
    case TariffAction.DELETE_TARIFF_SUCCESS: {
      return prepareDeleteSuccess(state.tariff.list.data, emptyEditData);
    }

    case TariffAction.SAVE_TARIFF_FAILED: {
      return prepareEditFailed(state.tariff.list.data, state.tariff.edit.data, action.showError);
    }
    case TariffAction.DELETE_TARIFF_FAILED: {
      return prepareListFailed(state.tariff.list.data, emptyEditData);
    }

    case TariffAction.NEW_TARIFF: {
      return prepareSuccess(state.tariff.list.data, emptyEditData);
    }

    case TariffAction.ADD_NEW_VALUE_TO_TARIFF: {
      const newObj = state.tariff.edit.data;
      newObj.values.push(action.tariffValue);
      return prepareSuccess(state.tariff.list.data, newObj);
    }

    case TariffAction.EDIT_VALUE_IN_TARIFF: {
      const newObj = state.tariff.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.tariffValue.id);
      newObj.values.push(action.tariffValue);
      return prepareSuccess(state.tariff.list.data, newObj);
    }

    case TariffAction.REMOVE_VALUE_FROM_TARIFF: {
      const newObj = state.tariff.edit.data;
      newObj.values = newObj.values.filter(value => value.id !== action.tariffValue.id);
      return prepareSuccess(state.tariff.list.data, newObj);
    }

    case TariffAction.CLEAR_LOCAL_DATA_TARIFFS: {
      return prepareSuccess(null, emptyEditData);
    }

    default:
      return state.tariff;
  }
};

/* Selectors */
export const getTariffEditData = state => state.tariffs.tariff.edit.data;
export const getTariffListData = state => state.tariffs.tariff.list.data;
export const getTariffIsLoading = state => state.tariffs.tariff.list.isLoading || state.tariffs.tariff.edit.isLoading;
export const getTariffIsRequestError = state => state.tariffs.tariff.list.isRequestError || state.tariffs.tariff.edit.isRequestError;
export const getTariffIsSaved = state => state.tariffs.tariff.isSaved;
export const getTariffIsDeleted = state => state.tariffs.tariff.isDeleted;
