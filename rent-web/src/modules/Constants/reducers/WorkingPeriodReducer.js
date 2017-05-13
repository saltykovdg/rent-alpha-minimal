import * as WorkingPeriodAction from './../actions/WorkingPeriodAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
} from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

export const workingPeriodReducer = (state, action) => {
  switch (action.type) {
    case WorkingPeriodAction.FIND_LAST_WORKING_PERIOD:
    case WorkingPeriodAction.GET_WORKING_PERIOD:
    case WorkingPeriodAction.SAVE_WORKING_PERIOD: {
      return prepareEditLoading(state.workingPeriod.list.data, state.workingPeriod.edit.data);
    }
    case WorkingPeriodAction.FIND_WORKING_PERIODS_BY_NAME:
    case WorkingPeriodAction.GET_WORKING_PERIODS: {
      return prepareListLoading(state.workingPeriod.list.data, state.workingPeriod.edit.data);
    }

    case WorkingPeriodAction.GET_WORKING_PERIOD_SUCCESS: {
      return prepareSuccess(state.workingPeriod.list.data, action.data);
    }
    case WorkingPeriodAction.GET_WORKING_PERIODS_SUCCESS: {
      return prepareSuccess(action.data, state.workingPeriod.edit.data);
    }

    case WorkingPeriodAction.GET_WORKING_PERIOD_FAILED: {
      return prepareEditFailed(state.workingPeriod.list.data, emptyEditData);
    }
    case WorkingPeriodAction.GET_WORKING_PERIODS_FAILED: {
      return prepareListFailed(state.workingPeriod.list.data, state.workingPeriod.edit.data);
    }

    default:
      return state.workingPeriod;
  }
};

/* Selectors */
export const getWorkingPeriodEditData = state => state.constants.workingPeriod.edit.data;
export const getWorkingPeriodListData = state => state.constants.workingPeriod.list.data;
export const getWorkingPeriodIsLoading = state => state.constants.workingPeriod.list.isLoading || state.constants.workingPeriod.edit.isLoading;
export const getWorkingPeriodIsRequestError = state => state.constants.workingPeriod.list.isRequestError || state.constants.workingPeriod.edit.isRequestError;
