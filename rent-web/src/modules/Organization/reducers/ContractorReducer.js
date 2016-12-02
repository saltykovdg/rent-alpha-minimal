import * as OrganizationAction from './../OrganizationActions';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

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
    case OrganizationAction.GET_CONTRACTOR:
    case OrganizationAction.SAVE_CONTRACTOR: {
      return prepareEdit(state.contractor.edit.data, true, false, false, false);
    }
    case OrganizationAction.FIND_CONTRACTORS_BY_NAME:
    case OrganizationAction.GET_CONTRACTORS:
    case OrganizationAction.DELETE_CONTRACTOR: {
      return prepareList(state.contractor.list.data, emptyEditData, true, false, false, false);
    }

    case OrganizationAction.GET_CONTRACTOR_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case OrganizationAction.GET_CONTRACTORS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case OrganizationAction.GET_CONTRACTOR_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case OrganizationAction.GET_CONTRACTORS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case OrganizationAction.SAVE_CONTRACTOR_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case OrganizationAction.DELETE_CONTRACTOR_SUCCESS: {
      return prepareList(state.contractor.list.data, emptyEditData, false, false, false, true);
    }

    case OrganizationAction.SAVE_CONTRACTOR_FAILED: {
      return prepareEdit(state.contractor.edit.data, false, true, false, false);
    }
    case OrganizationAction.DELETE_CONTRACTOR_FAILED: {
      return prepareList(state.contractor.list.data, emptyEditData, false, true, false, false);
    }

    case OrganizationAction.NEW_CONTRACTOR: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.contractor.list, emptyEditData);
  }
};

// Export Reducer
export default contractorReducer;
