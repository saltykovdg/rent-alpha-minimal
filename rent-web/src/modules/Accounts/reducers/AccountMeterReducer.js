import * as AccountMeterAction from './../actions/AccountMeterAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const accountMeterReducer = (state, action) => {
  switch (action.type) {
    case AccountMeterAction.GET_ACCOUNT_METER:
    case AccountMeterAction.SAVE_ACCOUNT_METER: {
      return prepareEdit(state.accountMeter.edit.data, true, false, false, false);
    }
    case AccountMeterAction.GET_ACCOUNT_METERS:
    case AccountMeterAction.DELETE_ACCOUNT_METER: {
      return prepareList(state.accountMeter.list.data, emptyEditData, true, false, false, false);
    }

    case AccountMeterAction.GET_ACCOUNT_METER_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AccountMeterAction.GET_ACCOUNT_METERS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AccountMeterAction.GET_ACCOUNT_METER_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AccountMeterAction.GET_ACCOUNT_METERS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AccountMeterAction.SAVE_ACCOUNT_METER_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AccountMeterAction.DELETE_ACCOUNT_METER_SUCCESS: {
      return prepareList(state.accountMeter.list.data, emptyEditData, false, false, false, true);
    }

    case AccountMeterAction.SAVE_ACCOUNT_METER_FAILED: {
      return prepareEdit(state.accountMeter.edit.data, false, true, false, false);
    }
    case AccountMeterAction.DELETE_ACCOUNT_METER_FAILED: {
      return prepareList(state.accountMeter.list.data, emptyEditData, false, true, false, false);
    }

    case AccountMeterAction.NEW_ACCOUNT_METER: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.accountMeter.list, emptyEditData);
  }
};

/* Selectors */
export const getAccountMeterEditData = state => state.accounts.accountMeter.edit.data;
export const getAccountMeterListData = state => state.accounts.accountMeter.list.data;
export const getAccountMeterIsLoading = state => state.accounts.accountMeter.list.isLoading || state.accounts.accountMeter.edit.isLoading;
export const getAccountMeterIsRequestError = state => state.accounts.accountMeter.list.isRequestError || state.accounts.accountMeter.edit.isRequestError;
export const getAccountMeterIsSaved = state => state.accounts.accountMeter.isSaved;
export const getAccountMeterIsDeleted = state => state.accounts.accountMeter.isDeleted;
