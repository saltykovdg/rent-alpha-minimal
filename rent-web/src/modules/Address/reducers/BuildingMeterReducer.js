import * as BuildingMeterAction from './../actions/BuildingMeterAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
};

export const buildingMeterReducer = (state, action) => {
  switch (action.type) {
    case BuildingMeterAction.GET_BUILDING_METER:
    case BuildingMeterAction.SAVE_BUILDING_METER: {
      return prepareEdit(state.buildingMeter.edit.data, true, false, false, false);
    }
    case BuildingMeterAction.GET_BUILDING_METERS:
    case BuildingMeterAction.DELETE_BUILDING_METER: {
      return prepareList(state.buildingMeter.list.data, emptyEditData, true, false, false, false);
    }

    case BuildingMeterAction.GET_BUILDING_METER_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case BuildingMeterAction.GET_BUILDING_METERS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case BuildingMeterAction.GET_BUILDING_METER_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case BuildingMeterAction.GET_BUILDING_METERS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case BuildingMeterAction.SAVE_BUILDING_METER_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case BuildingMeterAction.DELETE_BUILDING_METER_SUCCESS: {
      return prepareList(state.buildingMeter.list.data, emptyEditData, false, false, false, true);
    }

    case BuildingMeterAction.SAVE_BUILDING_METER_FAILED: {
      return prepareEdit(state.buildingMeter.edit.data, false, true, false, false);
    }
    case BuildingMeterAction.DELETE_BUILDING_METER_FAILED: {
      return prepareList(state.buildingMeter.list.data, emptyEditData, false, true, false, false);
    }

    case BuildingMeterAction.NEW_BUILDING_METER: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.buildingMeter.list, emptyEditData);
  }
};

/* Selectors */
export const getBuildingMeterEditData = state => state.address.buildingMeter.edit.data;
export const getBuildingMeterListData = state => state.address.buildingMeter.list.data;
export const getBuildingMeterIsLoading = state => state.address.buildingMeter.list.isLoading || state.address.buildingMeter.edit.isLoading;
export const getBuildingMeterIsRequestError = state => state.address.buildingMeter.list.isRequestError || state.address.buildingMeter.edit.isRequestError;
export const getBuildingMeterIsSaved = state => state.address.buildingMeter.isSaved;
export const getBuildingMeterIsDeleted = state => state.address.buildingMeter.isDeleted;
