import * as ApiCaller from '../../../util/ApiCaller';

export function getAccountParameters(page = 0) {
  return ApiCaller.callApi(`account-parameter?page=${page}`);
}

export function getAccountParameter(id) {
  return ApiCaller.callApi(`account-parameter/${id}?projection=accountParameterBasic`);
}

export function saveAccountParameter(object) {
  return ApiCaller.callApi('account-parameter', 'post', object);
}

export function deleteAccountParameter(object) {
  return ApiCaller.callApi(`account-parameter/${object.id}`, 'delete');
}

