import * as ApiCaller from '../../../util/ApiCaller';

export function getNormValues(page = 0) {
  return ApiCaller.callApi(`norm-value?page=${page}&sort=name`);
}

export function getNormValue(id) {
  return ApiCaller.callApi(`norm-value/${id}?projection=normValueBasic`);
}

export function saveNormValue(object) {
  return ApiCaller.callApi('norm-value', 'post', object);
}

export function deleteNormValue(object) {
  return ApiCaller.callApi(`norm-value/${object.id}`, 'delete');
}
