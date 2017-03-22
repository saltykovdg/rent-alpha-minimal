export const GET_BUILDING_METERS = 'GET_BUILDING_METERS';
export const GET_BUILDING_METERS_SUCCESS = 'GET_BUILDING_METERS_SUCCESS';
export const GET_BUILDING_METERS_FAILED = 'GET_BUILDING_METERS_FAILED';
export const GET_BUILDING_METER = 'GET_BUILDING_METER';
export const GET_BUILDING_METER_SUCCESS = 'GET_BUILDING_METER_SUCCESS';
export const GET_BUILDING_METER_FAILED = 'GET_BUILDING_METER_FAILED';
export const SAVE_BUILDING_METER = 'SAVE_BUILDING_METER';
export const SAVE_BUILDING_METER_SUCCESS = 'SAVE_BUILDING_METER_SUCCESS';
export const SAVE_BUILDING_METER_FAILED = 'SAVE_BUILDING_METER_FAILED';
export const DELETE_BUILDING_METER = 'DELETE_BUILDING_METER';
export const DELETE_BUILDING_METER_SUCCESS = 'DELETE_BUILDING_METER_SUCCESS';
export const DELETE_BUILDING_METER_FAILED = 'DELETE_BUILDING_METER_FAILED';
export const NEW_BUILDING_METER = 'NEW_BUILDING_METER';

export const getBuildingMeters = (page = 0) => {
  return {
    type: GET_BUILDING_METERS,
    page,
  };
};

export const getBuildingMetersSuccess = (data) => {
  return {
    type: GET_BUILDING_METERS_SUCCESS,
    data,
  };
};

export const getBuildingMetersFailed = () => {
  return {
    type: GET_BUILDING_METERS_FAILED,
  };
};

export const getBuildingMeter = (id) => {
  return {
    type: GET_BUILDING_METER,
    id,
  };
};

export const getBuildingMeterSuccess = (data) => {
  return {
    type: GET_BUILDING_METER_SUCCESS,
    data,
  };
};

export const getBuildingMeterFailed = (id) => {
  return {
    type: GET_BUILDING_METER_FAILED,
    id,
  };
};

export const saveBuildingMeter = (object) => {
  return {
    type: SAVE_BUILDING_METER,
    object,
  };
};

export const saveBuildingMeterSuccess = (data) => {
  return {
    type: SAVE_BUILDING_METER_SUCCESS,
    data,
  };
};

export const saveBuildingMeterFailed = (data) => {
  return {
    type: SAVE_BUILDING_METER_FAILED,
    data,
  };
};

export const deleteBuildingMeter = (object) => {
  return {
    type: DELETE_BUILDING_METER,
    object,
  };
};

export const deleteBuildingMeterSuccess = (object) => {
  return {
    type: DELETE_BUILDING_METER_SUCCESS,
    object,
  };
};

export const deleteBuildingMeterFailed = (data) => {
  return {
    type: DELETE_BUILDING_METER_FAILED,
    data,
  };
};

export const newBuildingMeter = () => {
  return {
    type: NEW_BUILDING_METER,
  };
};
