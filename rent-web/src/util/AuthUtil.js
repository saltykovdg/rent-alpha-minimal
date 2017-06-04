import { browserHistory } from 'react-router';
import * as LoginPath from './../modules/Security/paths/LoginPath';

export function getAuthorization() {
  let authorization = window.authorization;
  if (!authorization) {
    window.authorization = window.localStorage.getItem('jwt');
    authorization = window.authorization;
  }
  return authorization;
}

export function login(authorization, remember) {
  window.authorization = authorization;
  if (remember) {
    window.localStorage.setItem('jwt', authorization);
  }
}

export function logout() {
  window.authorization = null;
  window.localStorage.removeItem('jwt');
  browserHistory.push(LoginPath.LOGIN);
}

export function jwtDetails(authorization) {
  return atob(authorization.split('.')[1]);
}

export function checkJWT(authorization) {
  let isNotExpiredToken = false;
  if (authorization) {
    const jwt = JSON.parse(jwtDetails(authorization));
    if (jwt.exp < Date.now() / 1000) {
      isNotExpiredToken = false;
    } else {
      isNotExpiredToken = true;
    }
  }
  return isNotExpiredToken;
}

export function getUserName() {
  const authorization = this.getAuthorization();
  if (authorization) {
    const jwt = JSON.parse(this.jwtDetails(authorization));
    return jwt.sub;
  }
  return '';
}

export function getUserRole() {
  const authorization = this.getAuthorization();
  if (authorization) {
    const jwt = JSON.parse(this.jwtDetails(authorization));
    return jwt.role;
  }
  return '';
}
