import * as ServiceTypeAction from './../actions/ServiceTypeAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

export const serviceTypeReducer = (state, action) => {
  switch (action.type) {
    case ServiceTypeAction.GET_SERVICE_TYPE:
    case ServiceTypeAction.SAVE_SERVICE_TYPE: {
      return prepareEdit(state.serviceType.edit.data, true, false, false, false);
    }
    case ServiceTypeAction.FIND_SERVICE_TYPES_BY_NAME:
    case ServiceTypeAction.GET_SERVICE_TYPES:
    case ServiceTypeAction.DELETE_SERVICE_TYPE: {
      return prepareList(state.serviceType.list.data, emptyEditData, true, false, false, false);
    }

    case ServiceTypeAction.GET_SERVICE_TYPE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case ServiceTypeAction.GET_SERVICE_TYPES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case ServiceTypeAction.GET_SERVICE_TYPE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case ServiceTypeAction.GET_SERVICE_TYPES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case ServiceTypeAction.SAVE_SERVICE_TYPE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case ServiceTypeAction.DELETE_SERVICE_TYPE_SUCCESS: {
      return prepareList(state.serviceType.list.data, emptyEditData, false, false, false, true);
    }

    case ServiceTypeAction.SAVE_SERVICE_TYPE_FAILED: {
      return prepareEdit(state.serviceType.edit.data, false, true, false, false);
    }
    case ServiceTypeAction.DELETE_SERVICE_TYPE_FAILED: {
      return prepareList(state.serviceType.list.data, emptyEditData, false, true, false, false);
    }

    case ServiceTypeAction.NEW_SERVICE_TYPE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.serviceType.list, emptyEditData);
  }
};

/* Selectors */
export const getServiceTypeEditData = state => state.services.serviceType.edit.data;
export const getServiceTypeListData = state => state.services.serviceType.list.data;
export const getServiceTypeIsLoading = state => state.services.serviceType.list.isLoading || state.services.serviceType.edit.isLoading;
export const getServiceTypeIsRequestError = state => state.services.serviceType.list.isRequestError || state.services.serviceType.edit.isRequestError;
export const getServiceTypeIsSaved = state => state.services.serviceType.isSaved;
export const getServiceTypeIsDeleted = state => state.services.serviceType.isDeleted;
