import * as ApiCaller from '../../util/ApiCaller';

export function getStreetTypes(page = 0) {
  return ApiCaller.callApi(`street-type?page=${page}&sort=name`);
}
export function getStreets(page = 0) {
  return ApiCaller.callApi(`street?page=${page}&sort=streetType.name&sort=name`);
}
export function getBuildings(page = 0) {
  return ApiCaller.callApi(`building?page=${page}&sort=street.name&sort=house`);
}
export function getApartments(page = 0) {
  return ApiCaller.callApi(`apartment?page=${page}&sort=creationDate,desc`);
}

export function getStreetType(id) {
  return ApiCaller.callApi(`street-type/${id}?projection=streetTypeBasic`);
}
export function getStreet(id) {
  return ApiCaller.callApi(`street/${id}?projection=streetBasic`);
}
export function getBuilding(id) {
  return ApiCaller.callApi(`building/${id}?projection=buildingBasic`);
}
export function getApartment(id) {
  return ApiCaller.callApi(`apartment/${id}?projection=apartmentBasic`);
}

export function saveStreetType(object) {
  return ApiCaller.callApi('street-type', 'post', object);
}
export function saveStreet(object) {
  return ApiCaller.callApi('street', 'post', object);
}
export function saveBuilding(object) {
  return ApiCaller.callApi('building', 'post', object);
}
export function saveApartment(object) {
  return ApiCaller.callApi('apartment', 'post', object);
}

export function deleteStreetType(object) {
  return ApiCaller.callApi(`street-type/${object.id}`, 'delete');
}
export function deleteStreet(object) {
  return ApiCaller.callApi(`street/${object.id}`, 'delete');
}
export function deleteBuilding(object) {
  return ApiCaller.callApi(`building/${object.id}`, 'delete');
}
export function deleteApartment(object) {
  return ApiCaller.callApi(`apartment/${object.id}`, 'delete');
}

export function findStreetTypesByName(name = '') {
  return ApiCaller.callApi(`street-type/search/findByNameContainingOrderByName?name=${name}`);
}
export function findStreetsByName(name = '') {
  return ApiCaller.callApi(`street/search/findByNameContainingOrderByName?name=${name}`);
}
export function findBuildingsByStreetId(streetId = '') {
  return ApiCaller.callApi(`building/search/findByStreetId?streetId=${streetId}`);
}
export function findBuildingsByStreetName(streetName = '', page = 0) {
  return ApiCaller.callApi(`building/search/findByStreetName?streetName=${streetName}&page=${page}&sort=street.name&sort=house`);
}
export function findApartmentsByBuildingId(buildingId = '') {
  return ApiCaller.callApi(`apartment/search/findByBuildingId?buildingId=${buildingId}`);
}
export function findApartmentsByStreetNameAndBuildingName(streetName = '', buildingName = '', page = 0) {
  const sort = '&sort=building.street.name&sort=building.house&sort=apartment';
  return ApiCaller.callApi(`apartment/search/findByStreetNameAndBuildingName?streetName=${streetName}&buildingName=${buildingName}&page=${page}${sort}`);
}
