import * as AccountMeterAction from './../actions/AccountMeterAction';
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

export const accountMeterReducer = (state, action) => {
  switch (action.type) {
    case AccountMeterAction.GET_ACCOUNT_METER: {
      return prepareEditLoading(state.accountMeter.list.data, emptyEditData);
    }
    case AccountMeterAction.SAVE_ACCOUNT_METER: {
      return prepareEditLoading(state.accountMeter.list.data, state.accountMeter.edit.data);
    }
    case AccountMeterAction.GET_ACCOUNT_METERS:
    case AccountMeterAction.DELETE_ACCOUNT_METER: {
      return prepareListLoading(state.accountMeter.list.data, emptyEditData);
    }

    case AccountMeterAction.GET_ACCOUNT_METER_SUCCESS: {
      return prepareSuccess(state.accountMeter.list.data, action.data);
    }
    case AccountMeterAction.GET_ACCOUNT_METERS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AccountMeterAction.GET_ACCOUNT_METER_FAILED: {
      return prepareEditFailed(state.accountMeter.list.data, emptyEditData);
    }
    case AccountMeterAction.GET_ACCOUNT_METERS_FAILED: {
      return prepareListFailed(state.accountMeter.list.data, emptyEditData);
    }

    case AccountMeterAction.SAVE_ACCOUNT_METER_SUCCESS: {
      return prepareSaveSuccess(state.accountMeter.list.data, emptyEditData);
    }
    case AccountMeterAction.DELETE_ACCOUNT_METER_SUCCESS: {
      return prepareDeleteSuccess(state.accountMeter.list.data, emptyEditData);
    }

    case AccountMeterAction.SAVE_ACCOUNT_METER_FAILED: {
      return prepareEditFailed(state.accountMeter.list.data, state.accountMeter.edit.data);
    }
    case AccountMeterAction.DELETE_ACCOUNT_METER_FAILED: {
      return prepareListFailed(state.accountMeter.list.data, emptyEditData);
    }

    case AccountMeterAction.NEW_ACCOUNT_METER: {
      return prepareSuccess(state.accountMeter.list.data, emptyEditData);
    }

    default:
      return state.accountMeter;
  }
};

/* Selectors */
export const getAccountMeterEditData = state => state.accounts.accountMeter.edit.data;
export const getAccountMeterListData = state => state.accounts.accountMeter.list.data;
export const getAccountMeterIsLoading = state => state.accounts.accountMeter.list.isLoading || state.accounts.accountMeter.edit.isLoading;
export const getAccountMeterIsRequestError = state => state.accounts.accountMeter.list.isRequestError || state.accounts.accountMeter.edit.isRequestError;
export const getAccountMeterIsSaved = state => state.accounts.accountMeter.isSaved;
export const getAccountMeterIsDeleted = state => state.accounts.accountMeter.isDeleted;
