import * as AddressAction from './../AddressActions';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

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
    case AddressAction.GET_APARTMENT:
    case AddressAction.SAVE_APARTMENT: {
      return prepareEdit(state.apartment.edit.data, true, false, false, false);
    }
    case AddressAction.FIND_APARTMENTS_BY_BUILDING_ID:
    case AddressAction.FIND_APARTMENTS_BY_STREET_NAME_AND_BUILDING_NAME:
    case AddressAction.GET_APARTMENTS:
    case AddressAction.DELETE_APARTMENT: {
      return prepareList(state.apartment.list.data, emptyEditData, true, false, false, false);
    }

    case AddressAction.GET_APARTMENT_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AddressAction.GET_APARTMENTS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AddressAction.GET_APARTMENT_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AddressAction.GET_APARTMENTS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AddressAction.SAVE_APARTMENT_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AddressAction.DELETE_APARTMENT_SUCCESS: {
      return prepareList(state.apartment.list.data, emptyEditData, false, false, false, true);
    }

    case AddressAction.SAVE_APARTMENT_FAILED: {
      return prepareEdit(state.apartment.edit.data, false, true, false, false);
    }
    case AddressAction.DELETE_APARTMENT_FAILED: {
      return prepareList(state.apartment.list.data, emptyEditData, false, true, false, false);
    }

    case AddressAction.NEW_APARTMENT: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.apartment.list, emptyEditData);
  }
};

// Export Reducer
export default apartmentReducer;
