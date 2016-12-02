import streetTypeReducer from './reducers/StreetTypeReducer';
import streetReducer from './reducers/StreetReducer';
import buildingReducer from './reducers/BuildingReducer';
import apartmentReducer from './reducers/ApartmentReducer';

// Initial State
const data = {
  list: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  edit: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  isSaved: false,
  isDeleted: false,
};

const initialState = {
  streetType: data,
  street: data,
  building: data,
  apartment: data,
};

const addressReducer = (state = initialState, action) => {
  return {
    streetType: streetTypeReducer(state, action),
    street: streetReducer(state, action),
    building: buildingReducer(state, action),
    apartment: apartmentReducer(state, action),
  };
};

/* Selectors */
export const getStreetTypeEditData = state => state.address.streetType.edit.data;
export const getStreetTypeListData = state => state.address.streetType.list.data;
export const getStreetTypeIsLoading = state => state.address.streetType.list.isLoading || state.address.streetType.edit.isLoading;
export const getStreetTypeIsRequestError = state => state.address.streetType.list.isRequestError || state.address.streetType.edit.isRequestError;
export const getStreetTypeIsSaved = state => state.address.streetType.isSaved;
export const getStreetTypeIsDeleted = state => state.address.streetType.isDeleted;

export const getStreetEditData = state => state.address.street.edit.data;
export const getStreetListData = state => state.address.street.list.data;
export const getStreetIsLoading = state => state.address.street.list.isLoading || state.address.street.edit.isLoading;
export const getStreetIsRequestError = state => state.address.street.list.isRequestError || state.address.street.edit.isRequestError;
export const getStreetIsSaved = state => state.address.street.isSaved;
export const getStreetIsDeleted = state => state.address.street.isDeleted;

export const getBuildingEditData = state => state.address.building.edit.data;
export const getBuildingListData = state => state.address.building.list.data;
export const getBuildingIsLoading = state => state.address.building.list.isLoading || state.address.building.edit.isLoading;
export const getBuildingIsRequestError = state => state.address.building.list.isRequestError || state.address.building.edit.isRequestError;
export const getBuildingIsSaved = state => state.address.building.isSaved;
export const getBuildingIsDeleted = state => state.address.building.isDeleted;

export const getApartmentEditData = state => state.address.apartment.edit.data;
export const getApartmentListData = state => state.address.apartment.list.data;
export const getApartmentIsLoading = state => state.address.apartment.list.isLoading || state.address.apartment.edit.isLoading;
export const getApartmentIsRequestError = state => state.address.apartment.list.isRequestError || state.address.apartment.edit.isRequestError;
export const getApartmentIsSaved = state => state.address.apartment.isSaved;
export const getApartmentIsDeleted = state => state.address.apartment.isDeleted;

export const getIsRequestError = state =>
  getStreetTypeIsRequestError(state) ||
  getStreetIsRequestError(state) ||
  getBuildingIsRequestError(state) ||
  getApartmentIsRequestError(state);

export const getIsLoading = state =>
  getStreetTypeIsLoading(state) ||
  getStreetIsLoading(state) ||
  getBuildingIsLoading(state) ||
  getApartmentIsLoading(state);

// Export Reducer
export default addressReducer;
