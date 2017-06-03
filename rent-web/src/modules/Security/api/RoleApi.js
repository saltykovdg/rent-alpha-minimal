import * as ApiCaller from '../../../util/ApiCaller';

export function getRoles(page = 0) {
  return ApiCaller.callApi(`role?page=${page}&sort=name&projection=roleMinimal`);
}

export function getRole(id) {
  return ApiCaller.callApi(`role/${id}?projection=roleBasic`);
}

export function saveRole(object) {
  return ApiCaller.callApi('role', 'post', object);
}

export function deleteRole(object) {
  return ApiCaller.callApi(`role/${object.id}`, 'delete');
}

export function findRolesByName(name = '') {
  return ApiCaller.callApi(`role/search/findByNameContainingOrderByName?name=${name}&projection=roleMinimal`);
}
