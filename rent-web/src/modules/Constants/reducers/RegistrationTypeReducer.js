import * as RegistrationTypeAction from './../actions/RegistrationTypeAction';
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
};

export const registrationTypeReducer = (state, action) => {
  switch (action.type) {
    case RegistrationTypeAction.GET_REGISTRATION_TYPE: {
      return prepareEditLoading(state.registrationType.list.data, emptyEditData);
    }
    case RegistrationTypeAction.SAVE_REGISTRATION_TYPE: {
      return prepareEditLoading(state.registrationType.list.data, state.registrationType.edit.data);
    }
    case RegistrationTypeAction.FIND_REGISTRATION_TYPES_BY_NAME:
    case RegistrationTypeAction.GET_REGISTRATION_TYPES:
    case RegistrationTypeAction.DELETE_REGISTRATION_TYPE: {
      return prepareListLoading(state.registrationType.list.data, emptyEditData);
    }

    case RegistrationTypeAction.GET_REGISTRATION_TYPE_SUCCESS: {
      return prepareSuccess(state.registrationType.list.data, action.data);
    }
    case RegistrationTypeAction.GET_REGISTRATION_TYPES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case RegistrationTypeAction.GET_REGISTRATION_TYPE_FAILED: {
      return prepareEditFailed(state.registrationType.list.data, emptyEditData);
    }
    case RegistrationTypeAction.GET_REGISTRATION_TYPES_FAILED: {
      return prepareListFailed(state.registrationType.list.data, emptyEditData);
    }

    case RegistrationTypeAction.SAVE_REGISTRATION_TYPE_SUCCESS: {
      return prepareSaveSuccess(state.registrationType.list.data, emptyEditData);
    }
    case RegistrationTypeAction.DELETE_REGISTRATION_TYPE_SUCCESS: {
      return prepareDeleteSuccess(state.registrationType.list.data, emptyEditData);
    }

    case RegistrationTypeAction.SAVE_REGISTRATION_TYPE_FAILED: {
      return prepareEditFailed(state.registrationType.list.data, state.registrationType.edit.data);
    }
    case RegistrationTypeAction.DELETE_REGISTRATION_TYPE_FAILED: {
      return prepareListFailed(state.registrationType.list.data, emptyEditData);
    }

    case RegistrationTypeAction.NEW_REGISTRATION_TYPE: {
      return prepareSuccess(state.registrationType.list.data, emptyEditData);
    }

    default:
      return state.registrationType;
  }
};

/* Selectors */
export const getRegistrationTypeEditData = state => state.constants.registrationType.edit.data;
export const getRegistrationTypeListData = state => state.constants.registrationType.list.data;
export const getRegistrationTypeIsLoading = state => state.constants.registrationType.list.isLoading || state.constants.registrationType.edit.isLoading;
export const getRegistrationTypeIsRequestError = state => state.constants.registrationType.list.isRequestError || state.constants.registrationType.edit.isRequestError;
export const getRegistrationTypeIsSaved = state => state.constants.registrationType.isSaved;
export const getRegistrationTypeIsDeleted = state => state.constants.registrationType.isDeleted;
