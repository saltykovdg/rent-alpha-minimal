import * as ApiCaller from '../../../util/ApiCaller';

export function getTariffs(page = 0) {
  return ApiCaller.callApi(`tariff?page=${page}&sort=name`);
}

export function getTariff(id) {
  return ApiCaller.callApi(`tariff/${id}?projection=tariffBasic`);
}

export function saveTariff(object) {
  return ApiCaller.callApi('tariff', 'post', object);
}

export function deleteTariff(object) {
  return ApiCaller.callApi(`tariff/${object.id}`, 'delete');
}

export function findTariffsByName(name = '') {
  return ApiCaller.callApi(`tariff/search/findByNameContainingOrderByName?name=${name}`);
}
