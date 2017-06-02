import * as ApiCaller from '../../../util/ApiCaller';

export function login(object) {
  return ApiCaller.callApi('login', 'post', object);
}
