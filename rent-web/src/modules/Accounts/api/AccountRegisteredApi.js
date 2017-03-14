import * as ApiCaller from '../../../util/ApiCaller';

export function getAccountRegistereds(page = 0) {
  return ApiCaller.callApi(`account-registered?page=${page}&sort=name`);
}

export function getAccountRegistered(id) {
  return ApiCaller.callApi(`account-registered/${id}?projection=accountRegisteredBasic`);
}

export function saveAccountRegistered(object) {
  return ApiCaller.callApi('account-registered', 'post', object);
}

export function deleteAccountRegistered(object) {
  return ApiCaller.callApi(`account-registered/${object.id}`, 'delete');
}
