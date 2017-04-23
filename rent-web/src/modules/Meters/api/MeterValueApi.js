import * as ApiCaller from '../../../util/ApiCaller';

export function getMeterValues(page = 0) {
  return ApiCaller.callApi(`meter-value?page=${page}`);
}

export function getMeterValue(id) {
  return ApiCaller.callApi(`meter-value/${id}?projection=meterValueBasic`);
}

export function saveMeterValue(object) {
  return ApiCaller.callApi('meter-value', 'post', object);
}

export function deleteMeterValue(object) {
  return ApiCaller.callApi(`meter-value/${object.id}`, 'delete');
}
