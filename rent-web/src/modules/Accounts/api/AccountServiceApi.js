import * as ApiCaller from '../../../util/ApiCaller';

export function getAccountServices(page = 0) {
  return ApiCaller.callApi(`account-service?page=${page}&sort=name`);
}

export function getAccountService(id) {
  return ApiCaller.callApi(`account-service/${id}?projection=accountServiceBasic`);
}

export function saveAccountService(object) {
  return ApiCaller.callApi('account-service', 'post', object);
}

export function deleteAccountService(object) {
  return ApiCaller.callApi(`account-service/${object.id}`, 'delete');
}
