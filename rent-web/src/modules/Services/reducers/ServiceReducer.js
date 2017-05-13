import * as ServiceAction from './../actions/ServiceAction';
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

export const serviceReducer = (state, action) => {
  switch (action.type) {
    case ServiceAction.GET_SERVICE: {
      return prepareEditLoading(state.service.list.data, emptyEditData);
    }
    case ServiceAction.SAVE_SERVICE: {
      return prepareEditLoading(state.service.list.data, state.service.edit.data);
    }
    case ServiceAction.FIND_SERVICES_BY_NAME:
    case ServiceAction.GET_SERVICES:
    case ServiceAction.DELETE_SERVICE: {
      return prepareListLoading(state.service.list.data, emptyEditData);
    }

    case ServiceAction.GET_SERVICE_SUCCESS: {
      return prepareSuccess(state.service.list.data, action.data);
    }
    case ServiceAction.GET_SERVICES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case ServiceAction.GET_SERVICE_FAILED: {
      return prepareEditFailed(state.service.list.data, emptyEditData);
    }
    case ServiceAction.GET_SERVICES_FAILED: {
      return prepareListFailed(state.service.list.data, emptyEditData);
    }

    case ServiceAction.SAVE_SERVICE_SUCCESS: {
      return prepareSaveSuccess(state.service.list.data, emptyEditData);
    }
    case ServiceAction.DELETE_SERVICE_SUCCESS: {
      return prepareDeleteSuccess(state.service.list.data, emptyEditData);
    }

    case ServiceAction.SAVE_SERVICE_FAILED: {
      return prepareEditFailed(state.service.list.data, state.service.edit.data);
    }
    case ServiceAction.DELETE_SERVICE_FAILED: {
      return prepareListFailed(state.service.list.data, emptyEditData);
    }

    case ServiceAction.NEW_SERVICE: {
      return prepareSuccess(state.service.list.data, emptyEditData);
    }

    default:
      return state.service;
  }
};

/* Selectors */
export const getServiceEditData = state => state.services.service.edit.data;
export const getServiceListData = state => state.services.service.list.data;
export const getServiceIsLoading = state => state.services.service.list.isLoading || state.services.service.edit.isLoading;
export const getServiceIsRequestError = state => state.services.service.list.isRequestError || state.services.service.edit.isRequestError;
export const getServiceIsSaved = state => state.services.service.isSaved;
export const getServiceIsDeleted = state => state.services.service.isDeleted;
