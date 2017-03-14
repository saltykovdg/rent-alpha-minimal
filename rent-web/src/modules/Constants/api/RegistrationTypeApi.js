import * as ApiCaller from '../../../util/ApiCaller';

export function getRegistrationTypes(page = 0) {
  return ApiCaller.callApi(`registration-type?page=${page}&sort=name`);
}

export function getRegistrationType(id) {
  return ApiCaller.callApi(`registration-type/${id}?projection=registrationTypeBasic`);
}

export function saveRegistrationType(object) {
  return ApiCaller.callApi('registration-type', 'post', object);
}

export function deleteRegistrationType(object) {
  return ApiCaller.callApi(`registration-type/${object.id}`, 'delete');
}

export function findRegistrationTypesByName(name = '') {
  return ApiCaller.callApi(`registration-type/search/findByNameContainingOrderByName?name=${name}`);
}
