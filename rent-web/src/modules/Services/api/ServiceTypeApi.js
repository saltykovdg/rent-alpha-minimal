import * as ApiCaller from '../../../util/ApiCaller';

export function getServiceTypes(page = 0) {
  return ApiCaller.callApi(`service-type?page=${page}&sort=name`);
}

export function getServiceType(id) {
  return ApiCaller.callApi(`service-type/${id}?projection=serviceTypeBasic`);
}

export function saveServiceType(object) {
  return ApiCaller.callApi('service-type', 'post', object);
}

export function deleteServiceType(object) {
  return ApiCaller.callApi(`service-type/${object.id}`, 'delete');
}

export function findServiceTypesByName(name = '') {
  return ApiCaller.callApi(`service-type/search/findByNameContainingOrderByName?name=${name}`);
}
