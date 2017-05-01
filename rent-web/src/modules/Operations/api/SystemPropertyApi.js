import * as ApiCaller from '../../../util/ApiCaller';

export function getSystemProperties(page = 0) {
  return ApiCaller.callApi(`system-property?page=${page}&sort=name`);
}

export function getSystemProperty(id) {
  return ApiCaller.callApi(`system-property/${id}?projection=systemPropertyBasic`);
}

export function saveSystemProperty(object) {
  return ApiCaller.callApi('system-property', 'post', object);
}

export function deleteSystemProperty(object) {
  return ApiCaller.callApi(`system-property/${object.id}`, 'delete');
}

export function findSystemPropertiesByName(name = '') {
  return ApiCaller.callApi(`system-property/search/findByNameContainingOrderByName?name=${name}`);
}
