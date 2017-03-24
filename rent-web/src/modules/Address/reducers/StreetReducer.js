import * as AddressAction from './../AddressActions';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

const streetReducer = (state, action) => {
  switch (action.type) {
    case AddressAction.GET_STREET:
    case AddressAction.SAVE_STREET: {
      return prepareEdit(state.street.edit.data, true, false, false, false);
    }
    case AddressAction.FIND_STREETS:
    case AddressAction.FIND_STREETS_BY_NAME:
    case AddressAction.GET_STREETS:
    case AddressAction.DELETE_STREET: {
      return prepareList(state.street.list.data, emptyEditData, true, false, false, false);
    }

    case AddressAction.GET_STREET_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AddressAction.GET_STREETS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AddressAction.GET_STREET_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AddressAction.GET_STREETS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AddressAction.SAVE_STREET_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AddressAction.DELETE_STREET_SUCCESS: {
      return prepareList(state.street.list.data, emptyEditData, false, false, false, true);
    }

    case AddressAction.SAVE_STREET_FAILED: {
      return prepareEdit(state.street.edit.data, false, true, false, false);
    }
    case AddressAction.DELETE_STREET_FAILED: {
      return prepareList(state.street.list.data, emptyEditData, false, true, false, false);
    }

    case AddressAction.NEW_STREET: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.street.list, emptyEditData);
  }
};

// Export Reducer
export default streetReducer;
