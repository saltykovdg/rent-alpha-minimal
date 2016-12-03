import * as ApiCaller from '../../../util/ApiCaller';

export function getAccounts(page = 0) {
  return ApiCaller.callApi(`account?page=${page}&sort=name`);
}

export function getAccount(id) {
  return ApiCaller.callApi(`account/${id}?projection=accountBasic`);
}

export function saveAccount(object) {
  return ApiCaller.callApi('account', 'post', object);
}

export function deleteAccount(object) {
  return ApiCaller.callApi(`account/${object.id}`, 'delete');
}

export function findAccountsByName(name = '') {
  return ApiCaller.callApi(`account/search/findByNameContainingOrderByName?name=${name}`);
}
