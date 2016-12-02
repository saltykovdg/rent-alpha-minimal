import districtReducer from './reducers/DistrictReducer';
import buildingMaterialReducer from './reducers/BuildingMaterialsReducer';
import buildingTypeLivabilityReducer from './reducers/BuildingTypeLivabilityReducer';
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
  district: data,
  buildingMaterial: data,
  buildingTypeLivability: data,
  streetType: data,
  street: data,
  building: data,
  buildingCharacteristic: data,
  apartment: data,
};

const addressReducer = (state = initialState, action) => {
  return {
    district: districtReducer(state, action),
    buildingMaterial: buildingMaterialReducer(state, action),
    buildingTypeLivability: buildingTypeLivabilityReducer(state, action),
    streetType: streetTypeReducer(state, action),
    street: streetReducer(state, action),
    building: buildingReducer(state, action),
    buildingCharacteristic: null,
    apartment: apartmentReducer(state, action),
  };
};

/* Selectors */
export const getDistrictEditData = state => state.address.district.edit.data;
export const getDistrictListData = state => state.address.district.list.data;
export const getDistrictIsLoading = state => state.address.district.list.isLoading || state.address.district.edit.isLoading;
export const getDistrictIsRequestError = state => state.address.district.list.isRequestError || state.address.district.edit.isRequestError;
export const getDistrictIsSaved = state => state.address.district.isSaved;
export const getDistrictIsDeleted = state => state.address.district.isDeleted;

export const getBuildingMaterialEditData = state => state.address.buildingMaterial.edit.data;
export const getBuildingMaterialListData = state => state.address.buildingMaterial.list.data;
export const getBuildingMaterialIsLoading = state => state.address.buildingMaterial.list.isLoading || state.address.buildingMaterial.edit.isLoading;
export const getBuildingMaterialIsRequestError = state => state.address.buildingMaterial.list.isRequestError || state.address.buildingMaterial.edit.isRequestError;
export const getBuildingMaterialIsSaved = state => state.address.buildingMaterial.isSaved;
export const getBuildingMaterialIsDeleted = state => state.address.buildingMaterial.isDeleted;

export const getBuildingTypeLivabilityEditData = state => state.address.buildingTypeLivability.edit.data;
export const getBuildingTypeLivabilityListData = state => state.address.buildingTypeLivability.list.data;
export const getBuildingTypeLivabilityIsLoading = state => state.address.buildingTypeLivability.list.isLoading || state.address.buildingTypeLivability.edit.isLoading;
export const getBuildingTypeLivabilityIsRequestError = state => state.address.buildingTypeLivability.list.isRequestError || state.address.buildingTypeLivability.edit.isRequestError;
export const getBuildingTypeLivabilityIsSaved = state => state.address.buildingTypeLivability.isSaved;
export const getBuildingTypeLivabilityIsDeleted = state => state.address.buildingTypeLivability.isDeleted;

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
  getDistrictIsRequestError(state) ||
  getBuildingMaterialIsRequestError(state) ||
  getBuildingTypeLivabilityIsRequestError(state) ||
  getStreetTypeIsRequestError(state) ||
  getStreetIsRequestError(state) ||
  getBuildingIsRequestError(state) ||
  getApartmentIsRequestError(state);

export const getIsLoading = state =>
  getDistrictIsLoading(state) ||
  getBuildingMaterialIsLoading(state) ||
  getBuildingTypeLivabilityIsLoading(state) ||
  getStreetTypeIsLoading(state) ||
  getStreetIsLoading(state) ||
  getBuildingIsLoading(state) ||
  getApartmentIsLoading(state);

// Export Reducer
export default addressReducer;
