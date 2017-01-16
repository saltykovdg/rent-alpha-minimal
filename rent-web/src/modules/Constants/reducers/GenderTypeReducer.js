import * as GenderTypeAction from './../actions/GenderTypeAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

export const genderTypeReducer = (state, action) => {
  switch (action.type) {
    case GenderTypeAction.GET_GENDER_TYPE:
    case GenderTypeAction.SAVE_GENDER_TYPE: {
      return prepareEdit(state.genderType.edit.data, true, false, false, false);
    }
    case GenderTypeAction.FIND_GENDER_TYPES_BY_NAME:
    case GenderTypeAction.GET_GENDER_TYPES:
    case GenderTypeAction.DELETE_GENDER_TYPE: {
      return prepareList(state.genderType.list.data, emptyEditData, true, false, false, false);
    }

    case GenderTypeAction.GET_GENDER_TYPE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case GenderTypeAction.GET_GENDER_TYPES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case GenderTypeAction.GET_GENDER_TYPE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case GenderTypeAction.GET_GENDER_TYPES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case GenderTypeAction.SAVE_GENDER_TYPE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case GenderTypeAction.DELETE_GENDER_TYPE_SUCCESS: {
      return prepareList(state.genderType.list.data, emptyEditData, false, false, false, true);
    }

    case GenderTypeAction.SAVE_GENDER_TYPE_FAILED: {
      return prepareEdit(state.genderType.edit.data, false, true, false, false);
    }
    case GenderTypeAction.DELETE_GENDER_TYPE_FAILED: {
      return prepareList(state.genderType.list.data, emptyEditData, false, true, false, false);
    }

    case GenderTypeAction.NEW_GENDER_TYPE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.genderType.list, emptyEditData);
  }
};

/* Selectors */
export const getGenderTypeEditData = state => state.constants.genderType.edit.data;
export const getGenderTypeListData = state => state.constants.genderType.list.data;
export const getGenderTypeIsLoading = state => state.constants.genderType.list.isLoading || state.constants.genderType.edit.isLoading;
export const getGenderTypeIsRequestError = state => state.constants.genderType.list.isRequestError || state.constants.genderType.edit.isRequestError;
export const getGenderTypeIsSaved = state => state.constants.genderType.isSaved;
export const getGenderTypeIsDeleted = state => state.constants.genderType.isDeleted;
