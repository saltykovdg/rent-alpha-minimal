import * as ApiCaller from '../../../util/ApiCaller';

export function getCitizens(page = 0) {
  return ApiCaller.callApi(`citizen?page=${page}&sort=lastName`);
}

export function getCitizen(id) {
  return ApiCaller.callApi(`citizen/${id}?projection=citizenBasic`);
}

export function saveCitizen(object) {
  return ApiCaller.callApi('citizen', 'post', object);
}

export function deleteCitizen(object) {
  return ApiCaller.callApi(`citizen/${object.id}`, 'delete');
}

export function findCitizensByName(name = '') {
  return ApiCaller.callApi(`citizen/search/findByNameContainingOrderByName?name=${name}`);
}
