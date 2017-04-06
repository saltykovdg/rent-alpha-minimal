import * as ApiCaller from '../../../util/ApiCaller';

export function getWorkingPeriods(page = 0) {
  return ApiCaller.callApi(`working-period?page=${page}&sort=name`);
}

export function getWorkingPeriod(id) {
  return ApiCaller.callApi(`working-period/${id}?projection=workingPeriodBasic`);
}

export function saveWorkingPeriod(object) {
  return ApiCaller.callApi('working-period', 'post', object);
}

export function deleteWorkingPeriod(object) {
  return ApiCaller.callApi(`working-period/${object.id}`, 'delete');
}

export function findWorkingPeriodsByName(name = '') {
  return ApiCaller.callApi(`working-period/search/findByNameContainingOrderByDateStartDesc?name=${name}`);
}

export function findLastWorkingPeriod() {
  return ApiCaller.callApi('working-period/search/getFirstByIdIsNotNullOrderByDateStartDesc?projection=workingPeriodBasic');
}
