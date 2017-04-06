import * as WorkingPeriodAction from './../actions/WorkingPeriodAction';
import { prepareList } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

export const workingPeriodReducer = (state, action) => {
  switch (action.type) {
    case WorkingPeriodAction.FIND_LAST_WORKING_PERIOD:
    case WorkingPeriodAction.GET_WORKING_PERIOD:
    case WorkingPeriodAction.SAVE_WORKING_PERIOD: {
      return prepareList(state.workingPeriod.list.data, state.workingPeriod.edit.data, true, false, false, false);
    }
    case WorkingPeriodAction.FIND_WORKING_PERIODS_BY_NAME:
    case WorkingPeriodAction.GET_WORKING_PERIODS: {
      return prepareList(state.workingPeriod.list.data, state.workingPeriod.edit.data, true, false, false, false);
    }

    case WorkingPeriodAction.GET_WORKING_PERIOD_SUCCESS: {
      return prepareList(state.workingPeriod.list.data, action.data, false, false, false, false);
    }
    case WorkingPeriodAction.GET_WORKING_PERIODS_SUCCESS: {
      return prepareList(action.data, state.workingPeriod.edit.data, false, false, false, false);
    }

    case WorkingPeriodAction.GET_WORKING_PERIOD_FAILED: {
      return prepareList(state.workingPeriod.list.data, emptyEditData, false, true, false, false);
    }
    case WorkingPeriodAction.GET_WORKING_PERIODS_FAILED: {
      return prepareList(null, state.workingPeriod.edit.data, false, true, false, false);
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
