import * as RegistrationTypeAction from './../actions/RegistrationTypeAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

export const registrationTypeReducer = (state, action) => {
  switch (action.type) {
    case RegistrationTypeAction.GET_REGISTRATION_TYPE:
    case RegistrationTypeAction.SAVE_REGISTRATION_TYPE: {
      return prepareEdit(state.registrationType.edit.data, true, false, false, false);
    }
    case RegistrationTypeAction.FIND_REGISTRATION_TYPES_BY_NAME:
    case RegistrationTypeAction.GET_REGISTRATION_TYPES:
    case RegistrationTypeAction.DELETE_REGISTRATION_TYPE: {
      return prepareList(state.registrationType.list.data, emptyEditData, true, false, false, false);
    }

    case RegistrationTypeAction.GET_REGISTRATION_TYPE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case RegistrationTypeAction.GET_REGISTRATION_TYPES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case RegistrationTypeAction.GET_REGISTRATION_TYPE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case RegistrationTypeAction.GET_REGISTRATION_TYPES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case RegistrationTypeAction.SAVE_REGISTRATION_TYPE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case RegistrationTypeAction.DELETE_REGISTRATION_TYPE_SUCCESS: {
      return prepareList(state.registrationType.list.data, emptyEditData, false, false, false, true);
    }

    case RegistrationTypeAction.SAVE_REGISTRATION_TYPE_FAILED: {
      return prepareEdit(state.registrationType.edit.data, false, true, false, false);
    }
    case RegistrationTypeAction.DELETE_REGISTRATION_TYPE_FAILED: {
      return prepareList(state.registrationType.list.data, emptyEditData, false, true, false, false);
    }

    case RegistrationTypeAction.NEW_REGISTRATION_TYPE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.registrationType.list, emptyEditData);
  }
};

/* Selectors */
export const getRegistrationTypeEditData = state => state.constants.registrationType.edit.data;
export const getRegistrationTypeListData = state => state.constants.registrationType.list.data;
export const getRegistrationTypeIsLoading = state => state.constants.registrationType.list.isLoading || state.constants.registrationType.edit.isLoading;
export const getRegistrationTypeIsRequestError = state => state.constants.registrationType.list.isRequestError || state.constants.registrationType.edit.isRequestError;
export const getRegistrationTypeIsSaved = state => state.constants.registrationType.isSaved;
export const getRegistrationTypeIsDeleted = state => state.constants.registrationType.isDeleted;
