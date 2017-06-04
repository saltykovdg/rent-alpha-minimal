import * as ApiCaller from '../../../util/ApiCaller';

export function getUsers(page = 0) {
  return ApiCaller.callApi(`user?page=${page}&sort=name&projection=userMinimal`);
}

export function getUser(id) {
  return ApiCaller.callApi(`user/${id}?projection=userBasic`);
}

export function saveUser(object) {
  return ApiCaller.callApi('user', 'post', object);
}

export function deleteUser(object) {
  return ApiCaller.callApi(`user/${object.id}`, 'delete');
}
