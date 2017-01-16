import * as ApiCaller from '../../../util/ApiCaller';

export function getGenderTypes(page = 0) {
  return ApiCaller.callApi(`gender-type?page=${page}&sort=name`);
}

export function getGenderType(id) {
  return ApiCaller.callApi(`gender-type/${id}?projection=genderTypeBasic`);
}

export function saveGenderType(object) {
  return ApiCaller.callApi('gender-type', 'post', object);
}

export function deleteGenderType(object) {
  return ApiCaller.callApi(`gender-type/${object.id}`, 'delete');
}

export function findGenderTypesByName(name = '') {
  return ApiCaller.callApi(`gender-type/search/findByNameContainingOrderByName?name=${name}`);
}
