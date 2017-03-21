import * as ApiCaller from '../../../util/ApiCaller';

export function getAccountMeters(page = 0) {
  return ApiCaller.callApi(`account-meter?page=${page}&sort=name`);
}

export function getAccountMeter(id) {
  return ApiCaller.callApi(`account-meter/${id}?projection=accountMeterBasic`);
}

export function saveAccountMeter(object) {
  return ApiCaller.callApi('account-meter', 'post', object);
}

export function deleteAccountMeter(object) {
  return ApiCaller.callApi(`account-meter/${object.id}`, 'delete');
}
