import * as RoleAction from './../actions/RoleAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
  description: '',
};

export const roleReducer = (state, action) => {
  switch (action.type) {
    case RoleAction.GET_ROLE: {
      return prepareEditLoading(state.role.list.data, emptyEditData);
    }
    case RoleAction.SAVE_ROLE: {
      return prepareEditLoading(state.role.list.data, state.role.edit.data);
    }
    case RoleAction.FIND_ROLES_BY_NAME:
    case RoleAction.GET_ROLES:
    case RoleAction.DELETE_ROLE: {
      return prepareListLoading(state.role.list.data, emptyEditData);
    }

    case RoleAction.GET_ROLE_SUCCESS: {
      return prepareSuccess(state.role.list.data, action.data);
    }
    case RoleAction.GET_ROLES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case RoleAction.GET_ROLE_FAILED: {
      return prepareEditFailed(state.role.list.data, emptyEditData);
    }
    case RoleAction.GET_ROLES_FAILED: {
      return prepareListFailed(state.role.list.data, emptyEditData);
    }

    case RoleAction.SAVE_ROLE_SUCCESS: {
      return prepareSaveSuccess(state.role.list.data, emptyEditData);
    }
    case RoleAction.DELETE_ROLE_SUCCESS: {
      return prepareDeleteSuccess(state.role.list.data, emptyEditData);
    }

    case RoleAction.SAVE_ROLE_FAILED: {
      return prepareEditFailed(state.role.list.data, state.role.edit.data);
    }
    case RoleAction.DELETE_ROLE_FAILED: {
      return prepareListFailed(state.role.list.data, emptyEditData);
    }

    case RoleAction.NEW_ROLE: {
      return prepareSuccess(state.role.list.data, emptyEditData);
    }

    default:
      return state.role;
  }
};

/* Selectors */
export const getRoleEditData = state => state.security.role.edit.data;
export const getRoleListData = state => state.security.role.list.data;
export const getRoleIsLoading = state => state.security.role.list.isLoading || state.security.role.edit.isLoading;
export const getRoleIsRequestError = state => state.security.role.list.isRequestError || state.security.role.edit.isRequestError;
export const getRoleIsSaved = state => state.security.role.isSaved;
export const getRoleIsDeleted = state => state.security.role.isDeleted;
