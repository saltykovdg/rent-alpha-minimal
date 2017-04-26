import * as ApiCaller from '../../../util/ApiCaller';

export function getCitizens(page = 0) {
  const sort = '&sort=firstName&sort=lastName&sort=fatherName&sort=birthday';
  return ApiCaller.callApi(`citizen?page=${page}${sort}`);
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

export function findCitizens(firstName = '', lastName = '', fatherName = '', documentSeries = '', documentNumber = '', page = 0, size) {
  const query = `firstName=${firstName}&lastName=${lastName}&fatherName=${fatherName}&documentSeries=${documentSeries}&documentNumber=${documentNumber}`;
  const sort = '&sort=firstName&sort=lastName&sort=fatherName&sort=birthday';
  const sizeParam = size ? `&size=${size}` : '';
  const projection = '&projection=citizenMinimal';
  return ApiCaller.callApi(`citizen/search/find?${query}&page=${page}${sort}${sizeParam}${projection}`);
}
