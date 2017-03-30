import * as AddressAction from './../AddressActions';
import * as MeterAction from './../../Meters/actions/MeterAction';
import * as BuildingMeterAction from './../actions/BuildingMeterAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

export const emptyMeter = {
  id: '',
  meter: null,
  dateStart: null,
  dateEnd: null,
};

const emptyEditData = {
  id: '',
  house: '',
  houseNumber: 0,
  housing: '',
  meters: [],
};

const buildingReducer = (state, action) => {
  switch (action.type) {
    case AddressAction.GET_BUILDING:
    case AddressAction.SAVE_BUILDING: {
      return prepareEdit(state.building.edit.data, true, false, false, false);
    }
    case AddressAction.FIND_BUILDINGS_BY_STREET_ID:
    case AddressAction.FIND_BUILDINGS:
    case AddressAction.GET_BUILDINGS:
    case AddressAction.DELETE_BUILDING: {
      return prepareList(state.building.list.data, emptyEditData, true, false, false, false);
    }

    case AddressAction.GET_BUILDING_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AddressAction.GET_BUILDINGS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AddressAction.GET_BUILDING_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AddressAction.GET_BUILDINGS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AddressAction.SAVE_BUILDING_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AddressAction.DELETE_BUILDING_SUCCESS: {
      return prepareList(state.building.list.data, emptyEditData, false, false, false, true);
    }

    case AddressAction.SAVE_BUILDING_FAILED: {
      return prepareEdit(state.building.edit.data, emptyEditData, false, true, false, false);
    }
    case AddressAction.DELETE_BUILDING_FAILED: {
      return prepareList(state.building.list.data, emptyEditData, false, true, false, false);
    }

    case AddressAction.NEW_BUILDING: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    case AddressAction.ADD_NEW_METER_TO_BUILDING: {
      const newObj = state.building.edit.data;
      newObj.meters.push(action.meter);
      return prepareEdit(newObj, false, false, false, false);
    }
    case AddressAction.EDIT_METER_IN_BUILDING: {
      const newObj = state.building.edit.data;
      newObj.meters = newObj.meters.filter(meter => meter.id !== action.meter.id);
      newObj.meters.push(action.meter);
      return prepareEdit(newObj, false, false, false, false);
    }
    case AddressAction.REMOVE_METER_FROM_BUILDING: {
      const newObj = state.building.edit.data;
      newObj.meters = newObj.meters.filter(meter => meter.id !== action.meter.id);
      return prepareEdit(newObj, false, false, false, false);
    }

    case BuildingMeterAction.SAVE_BUILDING_METER:
    case BuildingMeterAction.SAVE_BUILDING_METER_SUCCESS:
    case BuildingMeterAction.SAVE_BUILDING_METER_FAILED:
    case MeterAction.CLEAR_LOCAL_DATA_METERS:
    case MeterAction.FIND_METERS_COMMON_HOUSE:
    case MeterAction.GET_METERS_SUCCESS:
    case MeterAction.GET_METERS_FAILED: {
      return state.building;
    }

    default:
      return prepareDefault(state.building.list, emptyEditData);
  }
};

// Export Reducer
export default buildingReducer;
