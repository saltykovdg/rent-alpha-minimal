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

const emptyEditData = {
  id: '',
  name: '',
  nameShort: '',
};

const streetTypeReducer = (state, action) => {
  switch (action.type) {
    case AddressAction.GET_STREET_TYPE: {
      return prepareEditLoading(state.streetType.list.data, emptyEditData);
    }
    case AddressAction.SAVE_STREET_TYPE: {
      return prepareEditLoading(state.streetType.list.data, state.streetType.edit.data);
    }
    case AddressAction.FIND_STREET_TYPES_BY_NAME:
    case AddressAction.GET_STREET_TYPES:
    case AddressAction.DELETE_STREET_TYPE: {
      return prepareListLoading(state.streetType.list.data, emptyEditData);
    }

    case AddressAction.GET_STREET_TYPE_SUCCESS: {
      return prepareSuccess(state.streetType.list.data, action.data);
    }
    case AddressAction.GET_STREET_TYPES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AddressAction.GET_STREET_TYPE_FAILED: {
      return prepareEditFailed(state.streetType.list.data, emptyEditData);
    }
    case AddressAction.GET_STREET_TYPES_FAILED: {
      return prepareListFailed(state.streetType.list.data, emptyEditData);
    }

    case AddressAction.SAVE_STREET_TYPE_SUCCESS: {
      return prepareSaveSuccess(state.streetType.list.data, emptyEditData);
    }
    case AddressAction.DELETE_STREET_TYPE_SUCCESS: {
      return prepareDeleteSuccess(state.streetType.list.data, emptyEditData);
    }

    case AddressAction.SAVE_STREET_TYPE_FAILED: {
      return prepareEditFailed(state.streetType.list.data, state.streetType.edit.data);
    }
    case AddressAction.DELETE_STREET_TYPE_FAILED: {
      return prepareListFailed(state.streetType.list.data, emptyEditData);
    }

    case AddressAction.NEW_STREET_TYPE: {
      return prepareSuccess(state.streetType.list.data, emptyEditData);
    }

    default:
      return state.streetType;
  }
};

// Export Reducer
export default streetTypeReducer;
