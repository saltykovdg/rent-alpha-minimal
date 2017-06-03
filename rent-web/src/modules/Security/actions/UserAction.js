export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';
export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const SAVE_USER = 'SAVE_USER';
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
export const SAVE_USER_FAILED = 'SAVE_USER_FAILED';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';
export const NEW_USER = 'NEW_USER';

export const getUsers = (page = 0) => {
  return {
    type: GET_USERS,
    page,
  };
};

export const getUsersSuccess = (data) => {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
};

export const getUsersFailed = () => {
  return {
    type: GET_USERS_FAILED,
  };
};

export const getUser = (id) => {
  return {
    type: GET_USER,
    id,
  };
};

export const getUserSuccess = (data) => {
  return {
    type: GET_USER_SUCCESS,
    data,
  };
};

export const getUserFailed = (id) => {
  return {
    type: GET_USER_FAILED,
    id,
  };
};

export const saveUser = (object) => {
  return {
    type: SAVE_USER,
    object,
  };
};

export const saveUserSuccess = (data) => {
  return {
    type: SAVE_USER_SUCCESS,
    data,
  };
};

export const saveUserFailed = (data) => {
  return {
    type: SAVE_USER_FAILED,
    data,
  };
};

export const deleteUser = (object, page = 0) => {
  return {
    type: DELETE_USER,
    object,
    page,
  };
};

export const deleteUserSuccess = (object) => {
  return {
    type: DELETE_USER_SUCCESS,
    object,
  };
};

export const deleteUserFailed = (data) => {
  return {
    type: DELETE_USER_FAILED,
    data,
  };
};

export const newUser = () => {
  return {
    type: NEW_USER,
  };
};
