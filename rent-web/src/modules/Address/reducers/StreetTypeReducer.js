import * as AddressAction from './../AddressActions';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
  nameShort: '',
};

const streetTypeReducer = (state, action) => {
  switch (action.type) {
    case AddressAction.GET_STREET_TYPE:
    case AddressAction.SAVE_STREET_TYPE: {
      return prepareEdit(state.streetType.edit.data, true, false, false, false);
    }
    case AddressAction.FIND_STREET_TYPES_BY_NAME:
    case AddressAction.GET_STREET_TYPES:
    case AddressAction.DELETE_STREET_TYPE: {
      return prepareList(state.streetType.list.data, emptyEditData, true, false, false, false);
    }

    case AddressAction.GET_STREET_TYPE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AddressAction.GET_STREET_TYPES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AddressAction.GET_STREET_TYPE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AddressAction.GET_STREET_TYPES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AddressAction.SAVE_STREET_TYPE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AddressAction.DELETE_STREET_TYPE_SUCCESS: {
      return prepareList(state.streetType.list.data, emptyEditData, false, false, false, true);
    }

    case AddressAction.SAVE_STREET_TYPE_FAILED: {
      return prepareEdit(state.streetType.edit.data, false, true, false, false);
    }
    case AddressAction.DELETE_STREET_TYPE_FAILED: {
      return prepareList(state.streetType.list.data, emptyEditData, false, true, false, false);
    }

    case AddressAction.NEW_STREET_TYPE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.streetType.list, emptyEditData);
  }
};

// Export Reducer
export default streetTypeReducer;
