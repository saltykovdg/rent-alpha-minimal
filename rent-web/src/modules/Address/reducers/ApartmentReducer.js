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
  apartment: '',
  apartmentNumber: 0,
  apartmentLetter: '',
  entrance: 0,
  floor: 0,
  totalArea: 0,
  livingArea: 0,
  roomsNumber: 0,
  building: {
    id: '',
    street: {
      id: '',
    },
  },
};

const apartmentReducer = (state, action) => {
  switch (action.type) {
    case AddressAction.GET_APARTMENT: {
      return prepareEditLoading(state.apartment.list.data, emptyEditData);
    }
    case AddressAction.SAVE_APARTMENT: {
      return prepareEditLoading(state.apartment.list.data, state.apartment.edit.data);
    }
    case AddressAction.FIND_APARTMENTS_BY_BUILDING_ID:
    case AddressAction.FIND_APARTMENTS:
    case AddressAction.GET_APARTMENTS:
    case AddressAction.DELETE_APARTMENT: {
      return prepareListLoading(state.apartment.list.data, emptyEditData);
    }

    case AddressAction.GET_APARTMENT_SUCCESS: {
      return prepareSuccess(state.apartment.list.data, action.data);
    }
    case AddressAction.GET_APARTMENTS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AddressAction.GET_APARTMENT_FAILED: {
      return prepareEditFailed(state.apartment.list.data, emptyEditData);
    }
    case AddressAction.GET_APARTMENTS_FAILED: {
      return prepareListFailed(state.apartment.list.data, emptyEditData);
    }

    case AddressAction.SAVE_APARTMENT_SUCCESS: {
      return prepareSaveSuccess(state.apartment.list.data, emptyEditData);
    }
    case AddressAction.DELETE_APARTMENT_SUCCESS: {
      return prepareDeleteSuccess(state.apartment.list.data, emptyEditData);
    }

    case AddressAction.SAVE_APARTMENT_FAILED: {
      return prepareEditFailed(state.apartment.list.data, state.apartment.edit.data);
    }
    case AddressAction.DELETE_APARTMENT_FAILED: {
      return prepareListFailed(state.apartment.list.data, emptyEditData);
    }

    case AddressAction.NEW_APARTMENT: {
      return prepareSuccess(state.apartment.list.data, emptyEditData);
    }

    case AddressAction.CLEAR_LOCAL_DATA_APARTMENTS: {
      return prepareSuccess(null, emptyEditData);
    }

    default:
      return state.apartment;
  }
};

// Export Reducer
export default apartmentReducer;
