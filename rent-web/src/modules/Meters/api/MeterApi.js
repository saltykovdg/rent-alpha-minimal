import * as ApiCaller from '../../../util/ApiCaller';

export function getMeters(page = 0) {
  return ApiCaller.callApi(`meter?page=${page}`);
}

export function getMeter(id) {
  return ApiCaller.callApi(`meter/${id}?projection=meterBasic`);
}

export function saveMeter(object) {
  return ApiCaller.callApi('meter', 'post', object);
}

export function deleteMeter(object) {
  return ApiCaller.callApi(`meter/${object.id}`, 'delete');
}

export function findMeters(meterType = '', service = '', name = '', serialNumber = '', page = 0) {
  const query = `&meterType=${meterType}&service=${service}&name=${name}&serialNumber=${serialNumber}`;
  const projection = '&projection=meterMinimal';
  return ApiCaller.callApi(`meter/search/find?page=${page}${query}${projection}`);
}
export function findMetersIndividual(service = '', name = '', serialNumber = '', page = 0, size = 0) {
  const query = `&service=${service}&name=${name}&serialNumber=${serialNumber}`;
  const sizeParam = size ? `&size=${size}` : '';
  const projection = '&projection=meterMinimalWithoutType';
  return ApiCaller.callApi(`meter/search/findIndividual?page=${page}${query}${sizeParam}${projection}`);
}
export function findMetersCommonHouse(service = '', name = '', serialNumber = '', page = 0, size = 0) {
  const query = `&service=${service}&name=${name}&serialNumber=${serialNumber}`;
  const sizeParam = size ? `&size=${size}` : '';
  const projection = '&projection=meterMinimalWithoutType';
  return ApiCaller.callApi(`meter/search/findCommonHouse?page=${page}${query}${sizeParam}${projection}`);
}
