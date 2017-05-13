import * as BuildingMeterAction from './../actions/BuildingMeterAction';
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

export const buildingMeterReducer = (state, action) => {
  switch (action.type) {
    case BuildingMeterAction.GET_BUILDING_METER: {
      return prepareEditLoading(state.buildingMeter.list.data, emptyEditData);
    }
    case BuildingMeterAction.SAVE_BUILDING_METER: {
      return prepareEditLoading(state.buildingMeter.list.data, state.buildingMeter.edit.data);
    }
    case BuildingMeterAction.GET_BUILDING_METERS:
    case BuildingMeterAction.DELETE_BUILDING_METER: {
      return prepareListLoading(state.buildingMeter.list.data, emptyEditData);
    }

    case BuildingMeterAction.GET_BUILDING_METER_SUCCESS: {
      return prepareSuccess(state.buildingMeter.list.data, action.data);
    }
    case BuildingMeterAction.GET_BUILDING_METERS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case BuildingMeterAction.GET_BUILDING_METER_FAILED: {
      return prepareEditFailed(state.buildingMeter.list.data, emptyEditData);
    }
    case BuildingMeterAction.GET_BUILDING_METERS_FAILED: {
      return prepareListFailed(state.buildingMeter.list.data, emptyEditData);
    }

    case BuildingMeterAction.SAVE_BUILDING_METER_SUCCESS: {
      return prepareSaveSuccess(state.buildingMeter.list.data, emptyEditData);
    }
    case BuildingMeterAction.DELETE_BUILDING_METER_SUCCESS: {
      return prepareDeleteSuccess(state.buildingMeter.list.data, emptyEditData);
    }

    case BuildingMeterAction.SAVE_BUILDING_METER_FAILED: {
      return prepareEditFailed(state.buildingMeter.list.data, state.buildingMeter.edit.data);
    }
    case BuildingMeterAction.DELETE_BUILDING_METER_FAILED: {
      return prepareListFailed(state.buildingMeter.list.data, emptyEditData);
    }

    case BuildingMeterAction.NEW_BUILDING_METER: {
      return prepareSuccess(state.buildingMeter.list.data, emptyEditData);
    }

    default:
      return state.buildingMeter;
  }
};

/* Selectors */
export const getBuildingMeterEditData = state => state.address.buildingMeter.edit.data;
export const getBuildingMeterListData = state => state.address.buildingMeter.list.data;
export const getBuildingMeterIsLoading = state => state.address.buildingMeter.list.isLoading || state.address.buildingMeter.edit.isLoading;
export const getBuildingMeterIsRequestError = state => state.address.buildingMeter.list.isRequestError || state.address.buildingMeter.edit.isRequestError;
export const getBuildingMeterIsSaved = state => state.address.buildingMeter.isSaved;
export const getBuildingMeterIsDeleted = state => state.address.buildingMeter.isDeleted;
