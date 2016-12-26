import * as ApiCaller from '../../../util/ApiCaller';

export function getTariffValues(page = 0) {
  return ApiCaller.callApi(`tariff-value?page=${page}&sort=name`);
}

export function getTariffValue(id) {
  return ApiCaller.callApi(`tariff-value/${id}?projection=tariffValueBasic`);
}

export function saveTariffValue(object) {
  return ApiCaller.callApi('tariff-value', 'post', object);
}

export function deleteTariffValue(object) {
  return ApiCaller.callApi(`tariff-value/${object.id}`, 'delete');
}

