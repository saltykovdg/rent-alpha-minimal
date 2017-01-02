import * as ApiCaller from '../../../util/ApiCaller';

export function getParameterTypes(page = 0) {
  return ApiCaller.callApi(`parameter-type?page=${page}&sort=name`);
}

export function getParameterType(id) {
  return ApiCaller.callApi(`parameter-type/${id}?projection=parameterTypeBasic`);
}

export function saveParameterType(object) {
  return ApiCaller.callApi('parameter-type', 'post', object);
}

export function deleteParameterType(object) {
  return ApiCaller.callApi(`parameter-type/${object.id}`, 'delete');
}

export function findParameterTypesByName(name = '') {
  return ApiCaller.callApi(`parameter-type/search/findByNameContainingOrderByCode?name=${name}`);
}
