import * as UserAction from './../actions/UserAction';
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
  blocked: false,
  online: false,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case UserAction.GET_USER: {
      return prepareEditLoading(state.user.list.data, emptyEditData);
    }
    case UserAction.SAVE_USER: {
      return prepareEditLoading(state.user.list.data, state.user.edit.data);
    }
    case UserAction.GET_USERS:
    case UserAction.DELETE_USER: {
      return prepareListLoading(state.user.list.data, emptyEditData);
    }

    case UserAction.GET_USER_SUCCESS: {
      return prepareSuccess(state.user.list.data, action.data);
    }
    case UserAction.GET_USERS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case UserAction.GET_USER_FAILED: {
      return prepareEditFailed(state.user.list.data, emptyEditData);
    }
    case UserAction.GET_USERS_FAILED: {
      return prepareListFailed(state.user.list.data, emptyEditData);
    }

    case UserAction.SAVE_USER_SUCCESS: {
      return prepareSaveSuccess(state.user.list.data, emptyEditData);
    }
    case UserAction.DELETE_USER_SUCCESS: {
      return prepareDeleteSuccess(state.user.list.data, emptyEditData);
    }

    case UserAction.SAVE_USER_FAILED: {
      return prepareEditFailed(state.user.list.data, state.user.edit.data);
    }
    case UserAction.DELETE_USER_FAILED: {
      return prepareListFailed(state.user.list.data, emptyEditData);
    }

    case UserAction.NEW_USER: {
      return prepareSuccess(state.user.list.data, emptyEditData);
    }

    default:
      return state.user;
  }
};

/* Selectors */
export const getUserEditData = state => state.security.user.edit.data;
export const getUserListData = state => state.security.user.list.data;
export const getUserIsLoading = state => state.security.user.list.isLoading || state.security.user.edit.isLoading;
export const getUserIsRequestError = state => state.security.user.list.isRequestError || state.security.user.edit.isRequestError;
export const getUserIsSaved = state => state.security.user.isSaved;
export const getUserIsDeleted = state => state.security.user.isDeleted;
