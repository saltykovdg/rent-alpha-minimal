import * as AddressAction from './../AddressActions';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  house: '',
  houseNumber: 0,
  housing: '',
  street: {
    id: '',
  },
};

const buildingReducer = (state, action) => {
  switch (action.type) {
    case AddressAction.GET_BUILDING:
    case AddressAction.SAVE_BUILDING: {
      return prepareEdit(state.building.edit.data, true, false, false, false);
    }
    case AddressAction.FIND_BUILDINGS_BY_STREET_ID:
    case AddressAction.FIND_BUILDINGS_BY_STREET_NAME:
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

    default:
      return prepareDefault(state.building.list, emptyEditData);
  }
};

// Export Reducer
export default buildingReducer;
