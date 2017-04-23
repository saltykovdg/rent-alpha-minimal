import * as ApiCaller from '../../../util/ApiCaller';

export function getBuildingMeters(page = 0) {
  return ApiCaller.callApi(`building-meter?page=${page}`);
}

export function getBuildingMeter(id) {
  return ApiCaller.callApi(`building-meter/${id}?projection=buildingMeterBasic`);
}

export function saveBuildingMeter(object) {
  return ApiCaller.callApi('building-meter', 'post', object);
}

export function deleteBuildingMeter(object) {
  return ApiCaller.callApi(`building-meter/${object.id}`, 'delete');
}
