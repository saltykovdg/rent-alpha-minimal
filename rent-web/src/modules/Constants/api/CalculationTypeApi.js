import * as ApiCaller from '../../../util/ApiCaller';

export function getCalculationTypes(page = 0) {
  return ApiCaller.callApi(`calculation-type?page=${page}&sort=name`);
}

export function getCalculationType(id) {
  return ApiCaller.callApi(`calculation-type/${id}?projection=calculationTypeBasic`);
}

export function saveCalculationType(object) {
  return ApiCaller.callApi('calculation-type', 'post', object);
}

export function deleteCalculationType(object) {
  return ApiCaller.callApi(`calculation-type/${object.id}`, 'delete');
}

export function findCalculationTypesByName(name = '') {
  return ApiCaller.callApi(`calculation-type/search/findByNameContainingOrderByName?name=${name}`);
}
