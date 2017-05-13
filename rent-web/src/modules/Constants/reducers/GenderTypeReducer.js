import * as GenderTypeAction from './../actions/GenderTypeAction';
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

export const genderTypeReducer = (state, action) => {
  switch (action.type) {
    case GenderTypeAction.GET_GENDER_TYPE: {
      return prepareEditLoading(state.genderType.list.data, emptyEditData);
    }
    case GenderTypeAction.SAVE_GENDER_TYPE: {
      return prepareEditLoading(state.genderType.list.data, state.genderType.edit.data);
    }
    case GenderTypeAction.FIND_GENDER_TYPES_BY_NAME:
    case GenderTypeAction.GET_GENDER_TYPES:
    case GenderTypeAction.DELETE_GENDER_TYPE: {
      return prepareListLoading(state.genderType.list.data, emptyEditData);
    }

    case GenderTypeAction.GET_GENDER_TYPE_SUCCESS: {
      return prepareSuccess(state.genderType.list.data, action.data);
    }
    case GenderTypeAction.GET_GENDER_TYPES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case GenderTypeAction.GET_GENDER_TYPE_FAILED: {
      return prepareEditFailed(state.genderType.list.data, emptyEditData);
    }
    case GenderTypeAction.GET_GENDER_TYPES_FAILED: {
      return prepareListFailed(state.genderType.list.data, emptyEditData);
    }

    case GenderTypeAction.SAVE_GENDER_TYPE_SUCCESS: {
      return prepareSaveSuccess(state.genderType.list.data, emptyEditData);
    }
    case GenderTypeAction.DELETE_GENDER_TYPE_SUCCESS: {
      return prepareDeleteSuccess(state.genderType.list.data, emptyEditData);
    }

    case GenderTypeAction.SAVE_GENDER_TYPE_FAILED: {
      return prepareEditFailed(state.genderType.list.data, state.genderType.edit.data);
    }
    case GenderTypeAction.DELETE_GENDER_TYPE_FAILED: {
      return prepareListFailed(state.genderType.list.data, emptyEditData);
    }

    case GenderTypeAction.NEW_GENDER_TYPE: {
      return prepareSuccess(state.genderType.list.data, emptyEditData);
    }

    default:
      return state.genderType;
  }
};

/* Selectors */
export const getGenderTypeEditData = state => state.constants.genderType.edit.data;
export const getGenderTypeListData = state => state.constants.genderType.list.data;
export const getGenderTypeIsLoading = state => state.constants.genderType.list.isLoading || state.constants.genderType.edit.isLoading;
export const getGenderTypeIsRequestError = state => state.constants.genderType.list.isRequestError || state.constants.genderType.edit.isRequestError;
export const getGenderTypeIsSaved = state => state.constants.genderType.isSaved;
export const getGenderTypeIsDeleted = state => state.constants.genderType.isDeleted;
