import * as ApiCaller from '../../../util/ApiCaller';

export function getMeters(page = 0) {
  return ApiCaller.callApi(`meter?page=${page}&sort=name`);
}

export function getMeter(id) {
  return ApiCaller.callApi(`meter/${id}?projection=meterBasic`);
}

export function saveMeter(object) {
  return ApiCaller.callApi('meter', 'post', object);
}

export function deleteMeter(object) {
  return ApiCaller.callApi(`meter/${object.id}`, 'delete');
}

export function findMetersByName(name = '') {
  return ApiCaller.callApi(`meter/search/findByNameContainingOrderByName?name=${name}`);
}
