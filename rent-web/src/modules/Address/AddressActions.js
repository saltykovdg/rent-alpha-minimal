export const GET_STREET_TYPES = 'GET_STREET_TYPES';
export const GET_STREETS = 'GET_STREETS';
export const GET_BUILDINGS = 'GET_BUILDINGS';
export const GET_APARTMENTS = 'GET_APARTMENTS';

export const GET_STREET_TYPES_SUCCESS = 'GET_STREET_TYPES_SUCCESS';
export const GET_STREETS_SUCCESS = 'GET_STREETS_SUCCESS';
export const GET_BUILDINGS_SUCCESS = 'GET_BUILDINGS_SUCCESS';
export const GET_APARTMENTS_SUCCESS = 'GET_APARTMENTS_SUCCESS';

export const GET_STREET_TYPES_FAILED = 'GET_STREET_TYPES_FAILED';
export const GET_STREETS_FAILED = 'GET_STREETS_FAILED';
export const GET_BUILDINGS_FAILED = 'GET_BUILDINGS_FAILED';
export const GET_APARTMENTS_FAILED = 'GET_APARTMENTS_FAILED';

export const GET_STREET_TYPE = 'GET_STREET_TYPE';
export const GET_STREET = 'GET_STREET';
export const GET_BUILDING = 'GET_BUILDING';
export const GET_APARTMENT = 'GET_APARTMENT';

export const GET_STREET_TYPE_SUCCESS = 'GET_STREET_TYPE_SUCCESS';
export const GET_STREET_SUCCESS = 'GET_STREET_SUCCESS';
export const GET_BUILDING_SUCCESS = 'GET_BUILDING_SUCCESS';
export const GET_APARTMENT_SUCCESS = 'GET_APARTMENT_SUCCESS';

export const GET_STREET_TYPE_FAILED = 'GET_STREET_TYPE_FAILED';
export const GET_STREET_FAILED = 'GET_STREET_FAILED';
export const GET_BUILDING_FAILED = 'GET_BUILDING_FAILED';
export const GET_APARTMENT_FAILED = 'GET_APARTMENT_FAILED';

export const SAVE_STREET_TYPE = 'SAVE_STREET_TYPE';
export const SAVE_STREET = 'SAVE_STREET';
export const SAVE_BUILDING = 'SAVE_BUILDING';
export const SAVE_APARTMENT = 'SAVE_APARTMENT';

export const SAVE_STREET_TYPE_SUCCESS = 'SAVE_STREET_TYPE_SUCCESS';
export const SAVE_STREET_SUCCESS = 'SAVE_STREET_SUCCESS';
export const SAVE_BUILDING_SUCCESS = 'SAVE_BUILDING_SUCCESS';
export const SAVE_APARTMENT_SUCCESS = 'SAVE_APARTMENT_SUCCESS';

export const SAVE_STREET_TYPE_FAILED = 'SAVE_STREET_TYPE_FAILED';
export const SAVE_STREET_FAILED = 'SAVE_STREET_FAILED';
export const SAVE_BUILDING_FAILED = 'SAVE_BUILDING_FAILED';
export const SAVE_APARTMENT_FAILED = 'SAVE_APARTMENT_FAILED';

export const DELETE_STREET_TYPE = 'DELETE_STREET_TYPE';
export const DELETE_STREET = 'DELETE_STREET';
export const DELETE_BUILDING = 'DELETE_BUILDING';
export const DELETE_APARTMENT = 'DELETE_APARTMENT';

export const DELETE_STREET_TYPE_SUCCESS = 'DELETE_STREET_TYPE_SUCCESS';
export const DELETE_STREET_SUCCESS = 'DELETE_STREET_SUCCESS';
export const DELETE_BUILDING_SUCCESS = 'DELETE_BUILDING_SUCCESS';
export const DELETE_APARTMENT_SUCCESS = 'DELETE_APARTMENT_SUCCESS';

export const DELETE_STREET_TYPE_FAILED = 'DELETE_STREET_TYPE_FAILED';
export const DELETE_STREET_FAILED = 'DELETE_STREET_FAILED';
export const DELETE_BUILDING_FAILED = 'DELETE_BUILDING_FAILED';
export const DELETE_APARTMENT_FAILED = 'DELETE_APARTMENT_FAILED';

export const NEW_STREET_TYPE = 'NEW_STREET_TYPE';
export const NEW_STREET = 'NEW_STREET';
export const NEW_BUILDING = 'NEW_BUILDING';
export const NEW_APARTMENT = 'NEW_APARTMENT';

export const FIND_STREET_TYPES_BY_NAME = 'FIND_STREET_TYPES_BY_NAME';
export const FIND_STREETS = 'FIND_STREETS';
export const FIND_STREETS_BY_NAME = 'FIND_STREETS_BY_NAME';
export const FIND_BUILDINGS_BY_STREET_ID = 'FIND_BUILDINGS_BY_STREET_ID';
export const FIND_BUILDINGS = 'FIND_BUILDINGS';
export const FIND_APARTMENTS_BY_BUILDING_ID = 'FIND_APARTMENTS_BY_BUILDING_ID';
export const FIND_APARTMENTS = 'FIND_APARTMENTS';

// meters
export const ADD_NEW_METER_TO_BUILDING = 'ADD_NEW_METER_TO_BUILDING';
export const EDIT_METER_IN_BUILDING = 'EDIT_METER_IN_BUILDING';
export const REMOVE_METER_FROM_BUILDING = 'REMOVE_METER_FROM_BUILDING';

export const CLEAR_LOCAL_DATA_APARTMENTS = 'CLEAR_LOCAL_DATA_APARTMENTS';

// get lists action creator
export const getStreetTypes = (page = 0) => {
  return {
    type: GET_STREET_TYPES,
    page,
  };
};
export const getStreets = (page = 0) => {
  return {
    type: GET_STREETS,
    page,
  };
};
export const getBuildings = (page = 0) => {
  return {
    type: GET_BUILDINGS,
    page,
  };
};
export const getApartments = (page = 0) => {
  return {
    type: GET_APARTMENTS,
    page,
  };
};

// get lists action creator success
export const getStreetTypesSuccess = (data) => {
  return {
    type: GET_STREET_TYPES_SUCCESS,
    data,
  };
};
export const getStreetsSuccess = (data) => {
  return {
    type: GET_STREETS_SUCCESS,
    data,
  };
};
export const getBuildingsSuccess = (data) => {
  return {
    type: GET_BUILDINGS_SUCCESS,
    data,
  };
};
export const getApartmentsSuccess = (data) => {
  return {
    type: GET_APARTMENTS_SUCCESS,
    data,
  };
};

// get lists action creator failed
export const getStreetTypesFailed = () => {
  return {
    type: GET_STREET_TYPES_FAILED,
  };
};
export const getStreetsFailed = () => {
  return {
    type: GET_STREETS_FAILED,
  };
};
export const getBuildingsFailed = () => {
  return {
    type: GET_BUILDINGS_FAILED,
  };
};
export const getApartmentsFailed = () => {
  return {
    type: GET_APARTMENTS_FAILED,
  };
};

// get by id action creator
export const getStreetType = (id) => {
  return {
    type: GET_STREET_TYPE,
    id,
  };
};
export const getStreet = (id) => {
  return {
    type: GET_STREET,
    id,
  };
};
export const getBuilding = (id) => {
  return {
    type: GET_BUILDING,
    id,
  };
};
export const getApartment = (id) => {
  return {
    type: GET_APARTMENT,
    id,
  };
};

// get by id action creator success
export const getStreetTypeSuccess = (data) => {
  return {
    type: GET_STREET_TYPE_SUCCESS,
    data,
  };
};
export const getStreetSuccess = (data) => {
  return {
    type: GET_STREET_SUCCESS,
    data,
  };
};
export const getBuildingSuccess = (data) => {
  return {
    type: GET_BUILDING_SUCCESS,
    data,
  };
};
export const getApartmentSuccess = (data) => {
  return {
    type: GET_APARTMENT_SUCCESS,
    data,
  };
};

// get by id action creator failed
export const getStreetTypeFailed = (id) => {
  return {
    type: GET_STREET_TYPE_FAILED,
    id,
  };
};
export const getStreetFailed = (id) => {
  return {
    type: GET_STREET_FAILED,
    id,
  };
};
export const getBuildingFailed = (id) => {
  return {
    type: GET_BUILDING_FAILED,
    id,
  };
};
export const getApartmentFailed = (id) => {
  return {
    type: GET_APARTMENT_FAILED,
    id,
  };
};

// save action creator
export const saveStreetType = (object) => {
  return {
    type: SAVE_STREET_TYPE,
    object,
  };
};
export const saveStreet = (object) => {
  return {
    type: SAVE_STREET,
    object,
  };
};
export const saveBuilding = (object) => {
  return {
    type: SAVE_BUILDING,
    object,
  };
};
export const saveApartment = (object) => {
  return {
    type: SAVE_APARTMENT,
    object,
  };
};

// save action creator success
export const saveStreetTypeSuccess = (data) => {
  return {
    type: SAVE_STREET_TYPE_SUCCESS,
    data,
  };
};
export const saveStreetSuccess = (data) => {
  return {
    type: SAVE_STREET_SUCCESS,
    data,
  };
};
export const saveBuildingSuccess = (data) => {
  return {
    type: SAVE_BUILDING_SUCCESS,
    data,
  };
};
export const saveApartmentSuccess = (data) => {
  return {
    type: SAVE_APARTMENT_SUCCESS,
    data,
  };
};

// save action creator failed
export const saveStreetTypeFailed = (data) => {
  return {
    type: SAVE_STREET_TYPE_FAILED,
    data,
  };
};
export const saveStreetFailed = (data) => {
  return {
    type: SAVE_STREET_FAILED,
    data,
  };
};
export const saveBuildingFailed = (data) => {
  return {
    type: SAVE_BUILDING_FAILED,
    data,
  };
};
export const saveApartmentFailed = (data) => {
  return {
    type: SAVE_APARTMENT_FAILED,
    data,
  };
};

// delete action creator
export const deleteStreetType = (object) => {
  return {
    type: DELETE_STREET_TYPE,
    object,
  };
};
export const deleteStreet = (object) => {
  return {
    type: DELETE_STREET,
    object,
  };
};
export const deleteBuilding = (object) => {
  return {
    type: DELETE_BUILDING,
    object,
  };
};
export const deleteApartment = (object) => {
  return {
    type: DELETE_APARTMENT,
    object,
  };
};

// delete action creator success
export const deleteStreetTypeSuccess = (object) => {
  return {
    type: DELETE_STREET_TYPE_SUCCESS,
    object,
  };
};
export const deleteStreetSuccess = (object) => {
  return {
    type: DELETE_STREET_SUCCESS,
    object,
  };
};
export const deleteBuildingSuccess = (object) => {
  return {
    type: DELETE_BUILDING_SUCCESS,
    object,
  };
};
export const deleteApartmentSuccess = (object) => {
  return {
    type: DELETE_APARTMENT_SUCCESS,
    object,
  };
};

// delete action creator failed
export const deleteStreetTypeFailed = (data) => {
  return {
    type: DELETE_STREET_TYPE_FAILED,
    data,
  };
};
export const deleteStreetFailed = (data) => {
  return {
    type: DELETE_STREET_FAILED,
    data,
  };
};
export const deleteBuildingFailed = (data) => {
  return {
    type: DELETE_BUILDING_FAILED,
    data,
  };
};
export const deleteApartmentFailed = (data) => {
  return {
    type: DELETE_APARTMENT_FAILED,
    data,
  };
};

// new record action creator
export const newStreetType = () => {
  return {
    type: NEW_STREET_TYPE,
  };
};
export const newStreet = () => {
  return {
    type: NEW_STREET,
  };
};
export const newBuilding = () => {
  return {
    type: NEW_BUILDING,
  };
};
export const newApartment = () => {
  return {
    type: NEW_APARTMENT,
  };
};

// find
export const findStreetTypesByName = (name = '') => {
  return {
    type: FIND_STREET_TYPES_BY_NAME,
    name,
  };
};
export const findStreets = (streetType = '', name = '', page = 0) => {
  return {
    type: FIND_STREETS,
    streetType,
    name,
    page,
  };
};
export const findStreetsByName = (name = '') => {
  return {
    type: FIND_STREETS_BY_NAME,
    name,
  };
};
export const findBuildingsByStreetId = (streetId = '') => {
  return {
    type: FIND_BUILDINGS_BY_STREET_ID,
    streetId,
  };
};
export const findBuildings = (street = '', house = '', page = 0) => {
  return {
    type: FIND_BUILDINGS,
    street,
    house,
    page,
  };
};
export const findApartmentsByBuildingId = (buildingId = '') => {
  return {
    type: FIND_APARTMENTS_BY_BUILDING_ID,
    buildingId,
  };
};
export const findApartments = (street = '', house = '', apartment = '', page = 0) => {
  return {
    type: FIND_APARTMENTS,
    street,
    house,
    apartment,
    page,
  };
};

// meters
export const addNewMeterToBuilding = (meter) => {
  return {
    type: ADD_NEW_METER_TO_BUILDING,
    meter,
  };
};
export const editMeterInBuilding = (meter) => {
  return {
    type: EDIT_METER_IN_BUILDING,
    meter,
  };
};
export const removeMeterFromBuilding = (meter) => {
  return {
    type: REMOVE_METER_FROM_BUILDING,
    meter,
  };
};

export const clearLocalDataApartments = () => {
  return {
    type: CLEAR_LOCAL_DATA_APARTMENTS,
  };
};
