import * as OrganizationAction from './../OrganizationActions';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

const emptyEditData = {
  id: '',
  name: '',
  nameShort: '',
};

const contractorTypeReducer = (state, action) => {
  switch (action.type) {
    case OrganizationAction.GET_CONTRACTOR_TYPE:
    case OrganizationAction.SAVE_CONTRACTOR_TYPE: {
      return prepareEdit(state.contractorType.edit.data, true, false, false, false);
    }
    case OrganizationAction.FIND_CONTRACTOR_TYPES_BY_NAME:
    case OrganizationAction.GET_CONTRACTOR_TYPES:
    case OrganizationAction.DELETE_CONTRACTOR_TYPE: {
      return prepareList(state.contractorType.list.data, emptyEditData, true, false, false, false);
    }

    case OrganizationAction.GET_CONTRACTOR_TYPE_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case OrganizationAction.GET_CONTRACTOR_TYPES_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case OrganizationAction.GET_CONTRACTOR_TYPE_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case OrganizationAction.GET_CONTRACTOR_TYPES_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case OrganizationAction.SAVE_CONTRACTOR_TYPE_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case OrganizationAction.DELETE_CONTRACTOR_TYPE_SUCCESS: {
      return prepareList(state.contractorType.list.data, emptyEditData, false, false, false, true);
    }

    case OrganizationAction.SAVE_CONTRACTOR_TYPE_FAILED: {
      return prepareEdit(state.contractorType.edit.data, false, true, false, false);
    }
    case OrganizationAction.DELETE_CONTRACTOR_TYPE_FAILED: {
      return prepareList(state.contractorType.list.data, emptyEditData, false, true, false, false);
    }

    case OrganizationAction.NEW_CONTRACTOR_TYPE: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    default:
      return prepareDefault(state.contractorType.list, emptyEditData);
  }
};

// Export Reducer
export default contractorTypeReducer;
