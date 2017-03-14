export const GET_ACCOUNT_OWNERS = 'GET_ACCOUNT_OWNERS';
export const GET_ACCOUNT_OWNERS_SUCCESS = 'GET_ACCOUNT_OWNERS_SUCCESS';
export const GET_ACCOUNT_OWNERS_FAILED = 'GET_ACCOUNT_OWNERS_FAILED';
export const GET_ACCOUNT_OWNER = 'GET_ACCOUNT_OWNER';
export const GET_ACCOUNT_OWNER_SUCCESS = 'GET_ACCOUNT_OWNER_SUCCESS';
export const GET_ACCOUNT_OWNER_FAILED = 'GET_ACCOUNT_OWNER_FAILED';
export const SAVE_ACCOUNT_OWNER = 'SAVE_ACCOUNT_OWNER';
export const SAVE_ACCOUNT_OWNER_SUCCESS = 'SAVE_ACCOUNT_OWNER_SUCCESS';
export const SAVE_ACCOUNT_OWNER_FAILED = 'SAVE_ACCOUNT_OWNER_FAILED';
export const DELETE_ACCOUNT_OWNER = 'DELETE_ACCOUNT_OWNER';
export const DELETE_ACCOUNT_OWNER_SUCCESS = 'DELETE_ACCOUNT_OWNER_SUCCESS';
export const DELETE_ACCOUNT_OWNER_FAILED = 'DELETE_ACCOUNT_OWNER_FAILED';
export const NEW_ACCOUNT_OWNER = 'NEW_ACCOUNT_OWNER';

export const getAccountOwners = (page = 0) => {
  return {
    type: GET_ACCOUNT_OWNERS,
    page,
  };
};

export const getAccountOwnersSuccess = (data) => {
  return {
    type: GET_ACCOUNT_OWNERS_SUCCESS,
    data,
  };
};

export const getAccountOwnersFailed = () => {
  return {
    type: GET_ACCOUNT_OWNERS_FAILED,
  };
};

export const getAccountOwner = (id) => {
  return {
    type: GET_ACCOUNT_OWNER,
    id,
  };
};

export const getAccountOwnerSuccess = (data) => {
  return {
    type: GET_ACCOUNT_OWNER_SUCCESS,
    data,
  };
};

export const getAccountOwnerFailed = (id) => {
  return {
    type: GET_ACCOUNT_OWNER_FAILED,
    id,
  };
};

export const saveAccountOwner = (object) => {
  return {
    type: SAVE_ACCOUNT_OWNER,
    object,
  };
};

export const saveAccountOwnerSuccess = (data) => {
  return {
    type: SAVE_ACCOUNT_OWNER_SUCCESS,
    data,
  };
};

export const saveAccountOwnerFailed = (data) => {
  return {
    type: SAVE_ACCOUNT_OWNER_FAILED,
    data,
  };
};

export const deleteAccountOwner = (object) => {
  return {
    type: DELETE_ACCOUNT_OWNER,
    object,
  };
};

export const deleteAccountOwnerSuccess = (object) => {
  return {
    type: DELETE_ACCOUNT_OWNER_SUCCESS,
    object,
  };
};

export const deleteAccountOwnerFailed = (data) => {
  return {
    type: DELETE_ACCOUNT_OWNER_FAILED,
    data,
  };
};

export const newAccountOwner = () => {
  return {
    type: NEW_ACCOUNT_OWNER,
  };
};
