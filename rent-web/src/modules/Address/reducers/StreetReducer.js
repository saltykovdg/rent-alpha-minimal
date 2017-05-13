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
};

const streetReducer = (state, action) => {
  switch (action.type) {
    case AddressAction.GET_STREET: {
      return prepareEditLoading(state.street.list.data, emptyEditData);
    }
    case AddressAction.SAVE_STREET: {
      return prepareEditLoading(state.street.list.data, state.street.edit.data);
    }
    case AddressAction.FIND_STREETS:
    case AddressAction.FIND_STREETS_BY_NAME:
    case AddressAction.GET_STREETS:
    case AddressAction.DELETE_STREET: {
      return prepareListLoading(state.street.list.data, emptyEditData);
    }

    case AddressAction.GET_STREET_SUCCESS: {
      return prepareSuccess(state.street.list.data, action.data);
    }
    case AddressAction.GET_STREETS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AddressAction.GET_STREET_FAILED: {
      return prepareEditFailed(state.street.list.data, emptyEditData);
    }
    case AddressAction.GET_STREETS_FAILED: {
      return prepareListFailed(state.street.list.data, emptyEditData);
    }

    case AddressAction.SAVE_STREET_SUCCESS: {
      return prepareSaveSuccess(state.street.list.data, emptyEditData);
    }
    case AddressAction.DELETE_STREET_SUCCESS: {
      return prepareDeleteSuccess(state.street.list.data, emptyEditData);
    }

    case AddressAction.SAVE_STREET_FAILED: {
      return prepareEditFailed(state.street.list.data, state.street.edit.data);
    }
    case AddressAction.DELETE_STREET_FAILED: {
      return prepareListFailed(state.street.list.data, emptyEditData);
    }

    case AddressAction.NEW_STREET: {
      return prepareSuccess(state.street.list.data, emptyEditData);
    }

    default:
      return state.street;
  }
};

// Export Reducer
export default streetReducer;
