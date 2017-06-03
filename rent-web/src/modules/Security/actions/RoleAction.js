export const GET_ROLES = 'GET_ROLES';
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
export const GET_ROLES_FAILED = 'GET_ROLES_FAILED';
export const GET_ROLE = 'GET_ROLE';
export const GET_ROLE_SUCCESS = 'GET_ROLE_SUCCESS';
export const GET_ROLE_FAILED = 'GET_ROLE_FAILED';
export const SAVE_ROLE = 'SAVE_ROLE';
export const SAVE_ROLE_SUCCESS = 'SAVE_ROLE_SUCCESS';
export const SAVE_ROLE_FAILED = 'SAVE_ROLE_FAILED';
export const DELETE_ROLE = 'DELETE_ROLE';
export const DELETE_ROLE_SUCCESS = 'DELETE_ROLE_SUCCESS';
export const DELETE_ROLE_FAILED = 'DELETE_ROLE_FAILED';
export const NEW_ROLE = 'NEW_ROLE';
export const FIND_ROLES_BY_NAME = 'FIND_ROLES_BY_NAME';

export const getRoles = (page = 0) => {
  return {
    type: GET_ROLES,
    page,
  };
};

export const getRolesSuccess = (data) => {
  return {
    type: GET_ROLES_SUCCESS,
    data,
  };
};

export const getRolesFailed = () => {
  return {
    type: GET_ROLES_FAILED,
  };
};

export const getRole = (id) => {
  return {
    type: GET_ROLE,
    id,
  };
};

export const getRoleSuccess = (data) => {
  return {
    type: GET_ROLE_SUCCESS,
    data,
  };
};

export const getRoleFailed = (id) => {
  return {
    type: GET_ROLE_FAILED,
    id,
  };
};

export const saveRole = (object) => {
  return {
    type: SAVE_ROLE,
    object,
  };
};

export const saveRoleSuccess = (data) => {
  return {
    type: SAVE_ROLE_SUCCESS,
    data,
  };
};

export const saveRoleFailed = (data) => {
  return {
    type: SAVE_ROLE_FAILED,
    data,
  };
};

export const deleteRole = (object, page = 0) => {
  return {
    type: DELETE_ROLE,
    object,
    page,
  };
};

export const deleteRoleSuccess = (object) => {
  return {
    type: DELETE_ROLE_SUCCESS,
    object,
  };
};

export const deleteRoleFailed = (data) => {
  return {
    type: DELETE_ROLE_FAILED,
    data,
  };
};

export const newRole = () => {
  return {
    type: NEW_ROLE,
  };
};

export const findRolesByName = (name = '') => {
  return {
    type: FIND_ROLES_BY_NAME,
    name,
  };
};
