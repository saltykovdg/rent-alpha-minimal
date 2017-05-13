import * as OrganizationAction from './../OrganizationActions';
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
  nameShort: '',
};

const contractorTypeReducer = (state, action) => {
  switch (action.type) {
    case OrganizationAction.GET_CONTRACTOR_TYPE: {
      return prepareEditLoading(state.contractorType.list.data, emptyEditData);
    }
    case OrganizationAction.SAVE_CONTRACTOR_TYPE: {
      return prepareEditLoading(state.contractorType.list.data, state.contractorType.edit.data);
    }
    case OrganizationAction.FIND_CONTRACTOR_TYPES_BY_NAME:
    case OrganizationAction.GET_CONTRACTOR_TYPES:
    case OrganizationAction.DELETE_CONTRACTOR_TYPE: {
      return prepareListLoading(state.contractorType.list.data, emptyEditData);
    }

    case OrganizationAction.GET_CONTRACTOR_TYPE_SUCCESS: {
      return prepareSuccess(state.contractorType.list.data, action.data);
    }
    case OrganizationAction.GET_CONTRACTOR_TYPES_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case OrganizationAction.GET_CONTRACTOR_TYPE_FAILED: {
      return prepareEditFailed(state.contractorType.list.data, emptyEditData);
    }
    case OrganizationAction.GET_CONTRACTOR_TYPES_FAILED: {
      return prepareListFailed(state.contractorType.list.data, emptyEditData);
    }

    case OrganizationAction.SAVE_CONTRACTOR_TYPE_SUCCESS: {
      return prepareSaveSuccess(state.contractorType.list.data, emptyEditData);
    }
    case OrganizationAction.DELETE_CONTRACTOR_TYPE_SUCCESS: {
      return prepareDeleteSuccess(state.contractorType.list.data, emptyEditData);
    }

    case OrganizationAction.SAVE_CONTRACTOR_TYPE_FAILED: {
      return prepareEditFailed(state.contractorType.list.data, state.contractorType.edit.data);
    }
    case OrganizationAction.DELETE_CONTRACTOR_TYPE_FAILED: {
      return prepareListFailed(state.contractorType.list.data, emptyEditData);
    }

    case OrganizationAction.NEW_CONTRACTOR_TYPE: {
      return prepareSuccess(state.contractorType.list.data, emptyEditData);
    }

    default:
      return state.contractorType;
  }
};

// Export Reducer
export default contractorTypeReducer;
