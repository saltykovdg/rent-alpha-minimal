import * as AddressAction from './../AddressActions';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

const buildingMaterialReducer = (state, action) => {
  switch (action.type) {
    case AddressAction.GET_BUILDING_MATERIAL:
    case AddressAction.SAVE_BUILDING_MATERIAL: {
      return prepareEdit(state.buildingMaterial.edit.data, true, false, false, false);
    }
    case AddressAction.GET_BUILDING_MATERIALS:
    case AddressAction.DELETE_BUILDING_MATERIAL: {
      return prepareList(state.buildingMaterial.list.data, emptyEditData, true, false, false, false);
    }

    case AddressAction.GET_BUILDING_MATERIAL_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AddressAction.GET_BUILDING_MATERIALS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AddressAction.GET_BUILDING_MATERIAL_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AddressAction.GET_BUILDING_MATERIALS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AddressAction.SAVE_BUILDING_MATERIAL_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AddressAction.DELETE_BUILDING_MATERIAL_SUCCESS: {
      return prepareList(state.buildingMaterial.list.data, emptyEditData, false, false, false, true);
    }

    case AddressAction.SAVE_BUILDING_MATERIAL_FAILED: {
      return prepareEdit(state.buildingMaterial.edit.data, false, true, false, false);
    }
    case AddressAction.DELETE_BUILDING_MATERIAL_FAILED: {
      return prepareList(state.buildingMaterial.list.data, emptyEditData, false, true, false, false);
    }

    case AddressAction.NEW_BUILDING_MATERIAL: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.buildingMaterial.list, emptyEditData);
  }
};

// Export Reducer
export default buildingMaterialReducer;
