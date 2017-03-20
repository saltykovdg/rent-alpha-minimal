import * as ApiCaller from '../../../util/ApiCaller';

export function getMeterTypes(page = 0) {
  return ApiCaller.callApi(`meter-type?page=${page}&sort=name`);
}

export function getMeterType(id) {
  return ApiCaller.callApi(`meter-type/${id}?projection=meterTypeBasic`);
}

export function saveMeterType(object) {
  return ApiCaller.callApi('meter-type', 'post', object);
}

export function deleteMeterType(object) {
  return ApiCaller.callApi(`meter-type/${object.id}`, 'delete');
}

export function findMeterTypesByName(name = '') {
  return ApiCaller.callApi(`meter-type/search/findByNameContainingOrderByName?name=${name}`);
}
