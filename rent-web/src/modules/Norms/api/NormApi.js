import * as ApiCaller from '../../../util/ApiCaller';

export function getNorms(page = 0) {
  const projection = '&projection=normMinimal';
  return ApiCaller.callApi(`norm?page=${page}&sort=name${projection}`);
}

export function getNorm(id) {
  return ApiCaller.callApi(`norm/${id}?projection=normBasic`);
}

export function saveNorm(object) {
  return ApiCaller.callApi('norm', 'post', object);
}

export function deleteNorm(object) {
  return ApiCaller.callApi(`norm/${object.id}`, 'delete');
}

export function findNormsByServiceId(serviceId = '') {
  const projection = '&projection=normMinimal';
  return ApiCaller.callApi(`norm/search/findByServiceId?serviceId=${serviceId}${projection}`);
}
