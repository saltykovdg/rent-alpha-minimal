import * as ApiCaller from '../../../util/ApiCaller';

export function getRecalculationTypes(page = 0) {
  return ApiCaller.callApi(`recalculation-type?page=${page}&sort=name&projection=recalculationTypeMinimal`);
}

export function getRecalculationType(id) {
  return ApiCaller.callApi(`recalculation-type/${id}?projection=recalculationTypeBasic`);
}

export function saveRecalculationType(object) {
  return ApiCaller.callApi('recalculation-type', 'post', object);
}

export function deleteRecalculationType(object) {
  return ApiCaller.callApi(`recalculation-type/${object.id}`, 'delete');
}

export function findRecalculationTypesByName(name = '') {
  return ApiCaller.callApi(`recalculation-type/search/findByNameContainingOrderByName?name=${name}&projection=recalculationTypeMinimal`);
}
