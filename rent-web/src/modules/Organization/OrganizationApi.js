import * as ApiCaller from '../../util/ApiCaller';

export function getContractorTypes(page = 0) {
  return ApiCaller.callApi(`contractor-type?page=${page}&sort=name`);
}
export function getContractors(page = 0) {
  return ApiCaller.callApi(`contractor?page=${page}&sort=contractorType.name&sort=name`);
}

export function getContractorType(id) {
  return ApiCaller.callApi(`contractor-type/${id}?projection=contractorTypeBasic`);
}
export function getContractor(id) {
  return ApiCaller.callApi(`contractor/${id}?projection=contractorBasic`);
}

export function saveContractorType(object) {
  return ApiCaller.callApi('contractor-type', 'post', object);
}
export function saveContractor(object) {
  return ApiCaller.callApi('contractor', 'post', object);
}

export function deleteContractorType(object) {
  return ApiCaller.callApi(`contractor-type/${object.id}`, 'delete');
}
export function deleteContractor(object) {
  return ApiCaller.callApi(`contractor/${object.id}`, 'delete');
}

export function findContractorTypesByName(name = '') {
  return ApiCaller.callApi(`contractor-type/search/findByNameContainingOrderByName?name=${name}`);
}
export function findContractorsByName(name = '') {
  return ApiCaller.callApi(`contractor/search/findByNameContainingOrderByName?name=${name}`);
}
