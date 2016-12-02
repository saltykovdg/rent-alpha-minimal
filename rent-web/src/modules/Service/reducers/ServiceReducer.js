import * as ServiceAction from './../actions/ServiceAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
};

export const serviceReducer = (state, action) => {
  switch (action.type) {
    case ServiceAction.GET_SERVICE:
    case ServiceAction.SAVE_SERVICE: {
      return prepareEdit(state.service.edit.data, true, false, false, false);
    }
    case ServiceAction.FIND_SERVICES_BY_NAME:
    case ServiceAction.GET_SERVICES:
    case ServiceAction.DELETE_SERVICE: {
      return prepareList(state.service.list.data, emptyEditData, true, false, false, false);
    }

    case ServiceAction.GET_SERVICE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case ServiceAction.GET_SERVICES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case ServiceAction.GET_SERVICE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case ServiceAction.GET_SERVICES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case ServiceAction.SAVE_SERVICE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case ServiceAction.DELETE_SERVICE_SUCCESS: {
      return prepareList(state.service.list.data, emptyEditData, false, false, false, true);
    }

    case ServiceAction.SAVE_SERVICE_FAILED: {
      return prepareEdit(state.service.edit.data, false, true, false, false);
    }
    case ServiceAction.DELETE_SERVICE_FAILED: {
      return prepareList(state.service.list.data, emptyEditData, false, true, false, false);
    }

    case ServiceAction.NEW_SERVICE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.service.list, emptyEditData);
  }
};

/* Selectors */
export const getServiceEditData = state => state.service.service.edit.data;
export const getServiceListData = state => state.service.service.list.data;
export const getServiceIsLoading = state => state.service.service.list.isLoading || state.service.service.edit.isLoading;
export const getServiceIsRequestError = state => state.service.service.list.isRequestError || state.service.service.edit.isRequestError;
export const getServiceIsSaved = state => state.service.service.isSaved;
export const getServiceIsDeleted = state => state.service.service.isDeleted;
