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
  contractorType: {
    id: '',
    name: '',
  },
};

const contractorReducer = (state, action) => {
  switch (action.type) {
    case OrganizationAction.GET_CONTRACTOR: {
      return prepareEditLoading(state.contractor.list.data, emptyEditData);
    }
    case OrganizationAction.SAVE_CONTRACTOR: {
      return prepareEditLoading(state.contractor.list.data, state.contractor.edit.data);
    }
    case OrganizationAction.FIND_CONTRACTORS_BY_NAME:
    case OrganizationAction.GET_CONTRACTORS:
    case OrganizationAction.DELETE_CONTRACTOR: {
      return prepareListLoading(state.contractor.list.data, emptyEditData);
    }

    case OrganizationAction.GET_CONTRACTOR_SUCCESS: {
      return prepareSuccess(state.contractor.list.data, action.data);
    }
    case OrganizationAction.GET_CONTRACTORS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case OrganizationAction.GET_CONTRACTOR_FAILED: {
      return prepareEditFailed(state.contractor.list.data, emptyEditData);
    }
    case OrganizationAction.GET_CONTRACTORS_FAILED: {
      return prepareListFailed(state.contractor.list.data, emptyEditData);
    }

    case OrganizationAction.SAVE_CONTRACTOR_SUCCESS: {
      return prepareSaveSuccess(state.contractor.list.data, emptyEditData);
    }
    case OrganizationAction.DELETE_CONTRACTOR_SUCCESS: {
      return prepareDeleteSuccess(state.contractor.list.data, emptyEditData);
    }

    case OrganizationAction.SAVE_CONTRACTOR_FAILED: {
      return prepareEditFailed(state.contractor.list.data, state.contractor.edit.data);
    }
    case OrganizationAction.DELETE_CONTRACTOR_FAILED: {
      return prepareListFailed(state.contractor.list.data, emptyEditData);
    }

    case OrganizationAction.NEW_CONTRACTOR: {
      return prepareSuccess(state.contractor.list.data, emptyEditData);
    }

    default:
      return state.contractor;
  }
};

// Export Reducer
export default contractorReducer;
