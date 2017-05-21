import * as ApiCaller from '../../../util/ApiCaller';

export function getMeasurementUnits(page = 0) {
  return ApiCaller.callApi(`measurement-unit?page=${page}&sort=name&projection=measurementUnitMinimal`);
}

export function getMeasurementUnit(id) {
  return ApiCaller.callApi(`measurement-unit/${id}?projection=measurementUnitBasic`);
}

export function saveMeasurementUnit(object) {
  return ApiCaller.callApi('measurement-unit', 'post', object);
}

export function deleteMeasurementUnit(object) {
  return ApiCaller.callApi(`measurement-unit/${object.id}`, 'delete');
}

export function findMeasurementUnitsByName(name = '') {
  return ApiCaller.callApi(`measurement-unit/search/findByNameContainingOrderByName?name=${name}&projection=measurementUnitMinimal`);
}
