import * as ServiceTypeAction from './../actions/ServiceTypeAction';
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

export const serviceTypeReducer = (state, action) => {
  switch (action.type) {
    case ServiceTypeAction.GET_SERVICE_TYPE: {
      return prepareEditLoading(state.serviceType.list.data, emptyEditData);
    }
    case ServiceTypeAction.SAVE_SERVICE_TYPE: {
      return prepareEditLoading(state.serviceType.list.data, state.serviceType.edit.data);
    }
    case ServiceTypeAction.FIND_SERVICE_TYPES_BY_NAME:
    case ServiceTypeAction.GET_SERVICE_TYPES:
    case ServiceTypeAction.DELETE_SERVICE_TYPE: {
      return prepareListLoading(state.serviceType.list.data, emptyEditData);
    }

    case ServiceTypeAction.GET_SERVICE_TYPE_SUCCESS: {
      return prepareSuccess(state.serviceType.list.data, action.data);
    }
    case ServiceTypeAction.GET_SERVICE_TYPES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case ServiceTypeAction.GET_SERVICE_TYPE_FAILED: {
      return prepareEditFailed(state.serviceType.list.data, emptyEditData);
    }
    case ServiceTypeAction.GET_SERVICE_TYPES_FAILED: {
      return prepareListFailed(state.serviceType.list.data, emptyEditData);
    }

    case ServiceTypeAction.SAVE_SERVICE_TYPE_SUCCESS: {
      return prepareSaveSuccess(state.serviceType.list.data, emptyEditData);
    }
    case ServiceTypeAction.DELETE_SERVICE_TYPE_SUCCESS: {
      return prepareDeleteSuccess(state.serviceType.list.data, emptyEditData);
    }

    case ServiceTypeAction.SAVE_SERVICE_TYPE_FAILED: {
      return prepareEditFailed(state.serviceType.list.data, state.serviceType.edit.data);
    }
    case ServiceTypeAction.DELETE_SERVICE_TYPE_FAILED: {
      return prepareListFailed(state.serviceType.list.data, emptyEditData);
    }

    case ServiceTypeAction.NEW_SERVICE_TYPE: {
      return prepareSuccess(state.serviceType.list.data, emptyEditData);
    }

    default:
      return state.serviceType;
  }
};

/* Selectors */
export const getServiceTypeEditData = state => state.services.serviceType.edit.data;
export const getServiceTypeListData = state => state.services.serviceType.list.data;
export const getServiceTypeIsLoading = state => state.services.serviceType.list.isLoading || state.services.serviceType.edit.isLoading;
export const getServiceTypeIsRequestError = state => state.services.serviceType.list.isRequestError || state.services.serviceType.edit.isRequestError;
export const getServiceTypeIsSaved = state => state.services.serviceType.isSaved;
export const getServiceTypeIsDeleted = state => state.services.serviceType.isDeleted;
