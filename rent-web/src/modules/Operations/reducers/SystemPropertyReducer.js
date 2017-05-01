import * as SystemPropertyAction from './../actions/SystemPropertyAction';

export const systemPropertyReducer = (state, action) => {
  switch (action.type) {
    case SystemPropertyAction.FIND_SYSTEM_PROPERTIES_BY_NAME:
    case SystemPropertyAction.GET_SYSTEM_PROPERTIES: {
      const systemProperty = state.systemProperty;
      systemProperty.isLoading = true;
      systemProperty.isRequestError = false;
      return state.systemProperty;
    }

    case SystemPropertyAction.GET_SYSTEM_PROPERTIES_SUCCESS: {
      const systemProperty = state.systemProperty;
      systemProperty.data = action.data;
      systemProperty.isLoading = false;
      systemProperty.isRequestError = false;
      return state.systemProperty;
    }

    case SystemPropertyAction.GET_SYSTEM_PROPERTIES_FAILED: {
      const systemProperty = state.systemProperty;
      systemProperty.isLoading = false;
      systemProperty.isRequestError = true;
      return state.systemProperty;
    }

    default:
      return state.systemProperty;
  }
};

/* Selectors */
export const getSystemPropertyData = state => state.operations.systemProperty.data;
export const getSystemPropertyIsLoading = state => state.operations.systemProperty.isLoading;
export const getSystemPropertyIsRequestError = state => state.operations.systemProperty.isRequestError;
