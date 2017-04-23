import * as ApiCaller from '../../../util/ApiCaller';

export function getAccountOwners(page = 0) {
  return ApiCaller.callApi(`account-owner?page=${page}`);
}

export function getAccountOwner(id) {
  return ApiCaller.callApi(`account-owner/${id}?projection=accountOwnerBasic`);
}

export function saveAccountOwner(object) {
  return ApiCaller.callApi('account-owner', 'post', object);
}

export function deleteAccountOwner(object) {
  return ApiCaller.callApi(`account-owner/${object.id}`, 'delete');
}
