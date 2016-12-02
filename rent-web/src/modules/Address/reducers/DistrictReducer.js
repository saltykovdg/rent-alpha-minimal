import * as AddressAction from './../AddressActions';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

const districtReducer = (state, action) => {
  switch (action.type) {
    case AddressAction.GET_DISTRICT:
    case AddressAction.SAVE_DISTRICT: {
      return prepareEdit(state.district.edit.data, true, false, false, false);
    }
    case AddressAction.GET_DISTRICTS:
    case AddressAction.DELETE_DISTRICT: {
      return prepareList(state.district.list.data, emptyEditData, true, false, false, false);
    }

    case AddressAction.GET_DISTRICT_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AddressAction.GET_DISTRICTS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AddressAction.GET_DISTRICT_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AddressAction.GET_DISTRICTS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AddressAction.SAVE_DISTRICT_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AddressAction.DELETE_DISTRICT_SUCCESS: {
      return prepareList(state.district.list.data, emptyEditData, false, false, false, true);
    }

    case AddressAction.SAVE_DISTRICT_FAILED: {
      return prepareEdit(state.district.edit.data, false, true, false, false);
    }
    case AddressAction.DELETE_DISTRICT_FAILED: {
      return prepareList(state.district.list.data, emptyEditData, false, true, false, false);
    }

    case AddressAction.NEW_DISTRICT: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.district.list, emptyEditData);
  }
};

// Export Reducer
export default districtReducer;
