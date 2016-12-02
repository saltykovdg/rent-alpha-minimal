import * as ApiCaller from '../../util/ApiCaller';

export function getDistricts(page = 0) {
  return ApiCaller.callApi(`district?page=${page}&sort=name`);
}
export function getBuildingMaterials(page = 0) {
  return ApiCaller.callApi(`building-material?page=${page}&sort=name`);
}
export function getBuildingTypesLivability(page = 0) {
  return ApiCaller.callApi(`building-type-livability?page=${page}&sort=name`);
}
export function getStreetTypes(page = 0) {
  return ApiCaller.callApi(`street-type?page=${page}&sort=name`);
}
export function getStreets(page = 0) {
  return ApiCaller.callApi(`street?page=${page}&sort=streetType.name&sort=name`);
}
export function getBuildings(page = 0) {
  return ApiCaller.callApi(`building?page=${page}&sort=street.name&sort=house`);
}
export function getBuildingCharacteristics(page = 0) {
  return ApiCaller.callApi(`building-characteristics?page=${page}&sort=creationDate,desc`);
}
export function getApartments(page = 0) {
  return ApiCaller.callApi(`apartment?page=${page}&sort=creationDate,desc`);
}

export function getDistrict(id) {
  return ApiCaller.callApi(`district/${id}?projection=districtBasic`);
}
export function getBuildingMaterial(id) {
  return ApiCaller.callApi(`building-material/${id}?projection=buildingMaterialBasic`);
}
export function getBuildingTypeLivability(id) {
  return ApiCaller.callApi(`building-type-livability/${id}?projection=buildingTypeLivabilityBasic`);
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
export function getBuildingCharacteristic(id) {
  return ApiCaller.callApi(`building-characteristics/${id}?projection=buildingCharacteristicsBasic`);
}
export function getApartment(id) {
  return ApiCaller.callApi(`apartment/${id}?projection=apartmentBasic`);
}

export function saveDistrict(object) {
  return ApiCaller.callApi('district', 'post', object);
}
export function saveBuildingMaterial(object) {
  return ApiCaller.callApi('building-material', 'post', object);
}
export function saveBuildingTypeLivability(object) {
  return ApiCaller.callApi('building-type-livability', 'post', object);
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
export function saveBuildingCharacteristic(object) {
  return ApiCaller.callApi('building-characteristics', 'post', object);
}
export function saveApartment(object) {
  return ApiCaller.callApi('apartment', 'post', object);
}

export function deleteDistrict(object) {
  return ApiCaller.callApi(`district/${object.id}`, 'delete');
}
export function deleteBuildingMaterial(object) {
  return ApiCaller.callApi(`building-material/${object.id}`, 'delete');
}
export function deleteBuildingTypeLivability(object) {
  return ApiCaller.callApi(`building-type-livability/${object.id}`, 'delete');
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
export function deleteBuildingCharacteristic(object) {
  return ApiCaller.callApi(`building-characteristics/${object.id}`, 'delete');
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
export function findApartmentsByStreetNameAndBuildingName(streetName = '', buildingName = '', page = 0) {
  const sort = '&sort=building.street.name&sort=building.house&sort=apartment';
  return ApiCaller.callApi(`apartment/search/findByStreetNameAndBuildingName?streetName=${streetName}&buildingName=${buildingName}&page=${page}${sort}`);
}
