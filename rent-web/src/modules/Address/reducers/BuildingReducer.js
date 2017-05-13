import * as AddressAction from './../AddressActions';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

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
    case AddressAction.GET_BUILDING: {
      return prepareEditLoading(state.building.list.data, emptyEditData);
    }
    case AddressAction.SAVE_BUILDING: {
      return prepareEditLoading(state.building.list.data, state.building.edit.data);
    }
    case AddressAction.FIND_BUILDINGS_BY_STREET_ID:
    case AddressAction.FIND_BUILDINGS:
    case AddressAction.GET_BUILDINGS:
    case AddressAction.DELETE_BUILDING: {
      return prepareListLoading(state.building.list.data, emptyEditData);
    }

    case AddressAction.GET_BUILDING_SUCCESS: {
      return prepareSuccess(state.building.list.data, action.data);
    }
    case AddressAction.GET_BUILDINGS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AddressAction.GET_BUILDING_FAILED: {
      return prepareEditFailed(state.building.list.data, emptyEditData);
    }
    case AddressAction.GET_BUILDINGS_FAILED: {
      return prepareListFailed(state.building.list.data, emptyEditData);
    }

    case AddressAction.SAVE_BUILDING_SUCCESS: {
      return prepareSaveSuccess(state.building.list.data, emptyEditData);
    }
    case AddressAction.DELETE_BUILDING_SUCCESS: {
      return prepareDeleteSuccess(state.building.list.data, emptyEditData);
    }

    case AddressAction.SAVE_BUILDING_FAILED: {
      return prepareEditFailed(state.building.list.data, state.building.edit.data);
    }
    case AddressAction.DELETE_BUILDING_FAILED: {
      return prepareListFailed(state.building.list.data, emptyEditData);
    }

    case AddressAction.NEW_BUILDING: {
      return prepareSuccess(state.building.list.data, emptyEditData);
    }

    case AddressAction.ADD_NEW_METER_TO_BUILDING: {
      const newObj = state.building.edit.data;
      newObj.meters.push(action.meter);
      return prepareSuccess(state.building.list.data, newObj);
    }
    case AddressAction.EDIT_METER_IN_BUILDING: {
      const newObj = state.building.edit.data;
      newObj.meters = newObj.meters.filter(meter => meter.id !== action.meter.id);
      newObj.meters.push(action.meter);
      return prepareSuccess(state.building.list.data, newObj);
    }
    case AddressAction.REMOVE_METER_FROM_BUILDING: {
      const newObj = state.building.edit.data;
      newObj.meters = newObj.meters.filter(meter => meter.id !== action.meter.id);
      return prepareSuccess(state.building.list.data, newObj);
    }

    default:
      return state.building;
  }
};

// Export Reducer
export default buildingReducer;
