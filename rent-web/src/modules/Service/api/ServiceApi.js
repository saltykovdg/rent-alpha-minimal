import * as ApiCaller from '../../../util/ApiCaller';

export function getServices(page = 0) {
  return ApiCaller.callApi(`service?page=${page}&sort=name`);
}

export function getService(id) {
  return ApiCaller.callApi(`service/${id}?projection=serviceBasic`);
}

export function saveService(object) {
  return ApiCaller.callApi('service', 'post', object);
}

export function deleteService(object) {
  return ApiCaller.callApi(`service/${object.id}`, 'delete');
}

export function findServicesByName(name = '') {
  return ApiCaller.callApi(`service/search/findByNameContainingOrderByName?name=${name}`);
}
