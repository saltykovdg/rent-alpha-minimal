import * as AddressAction from './../AddressActions';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

const buildingTypeLivabilityReducer = (state, action) => {
  switch (action.type) {
    case AddressAction.GET_BUILDING_TYPE_LIVABILITY:
    case AddressAction.SAVE_BUILDING_TYPE_LIVABILITY: {
      return prepareEdit(state.buildingTypeLivability.edit.data, true, false, false, false);
    }
    case AddressAction.GET_BUILDING_TYPES_LIVABILITY:
    case AddressAction.DELETE_BUILDING_TYPE_LIVABILITY: {
      return prepareList(state.buildingTypeLivability.list.data, emptyEditData, true, false, false, false);
    }

    case AddressAction.GET_BUILDING_TYPE_LIVABILITY_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AddressAction.GET_BUILDING_TYPES_LIVABILITY_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AddressAction.GET_BUILDING_TYPE_LIVABILITY_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AddressAction.GET_BUILDING_TYPES_LIVABILITY_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AddressAction.SAVE_BUILDING_TYPE_LIVABILITY_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AddressAction.DELETE_BUILDING_TYPE_LIVABILITY_SUCCESS: {
      return prepareList(state.buildingTypeLivability.list.data, emptyEditData, false, false, false, true);
    }

    case AddressAction.SAVE_BUILDING_TYPE_LIVABILITY_FAILED: {
      return prepareEdit(state.buildingTypeLivability.edit.data, false, true, false, false);
    }
    case AddressAction.DELETE_BUILDING_TYPE_LIVABILITY_FAILED: {
      return prepareList(state.buildingTypeLivability.list.data, emptyEditData, false, true, false, false);
    }

    case AddressAction.NEW_BUILDING_TYPE_LIVABILITY: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.buildingTypeLivability.list, emptyEditData);
  }
};

// Export Reducer
export default buildingTypeLivabilityReducer;
