import contractorTypeReducer from './reducers/ContractorTypeReducer';
import contractorReducer from './reducers/ContractorReducer';

// Initial State
const data = {
  list: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  edit: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  isSaved: false,
  isDeleted: false,
};

const initialState = {
  contractorType: data,
  contractor: data,
};

const organizationReducer = (state = initialState, action) => {
  return {
    contractorType: contractorTypeReducer(state, action),
    contractor: contractorReducer(state, action),
  };
};

/* Selectors */
export const getContractorTypeEditData = state => state.organization.contractorType.edit.data;
export const getContractorTypeListData = state => state.organization.contractorType.list.data;
export const getContractorTypeIsLoading = state => state.organization.contractorType.list.isLoading || state.organization.contractorType.edit.isLoading;
export const getContractorTypeIsRequestError = state => state.organization.contractorType.list.isRequestError || state.organization.contractorType.edit.isRequestError;
export const getContractorTypeIsSaved = state => state.organization.contractorType.isSaved;
export const getContractorTypeIsDeleted = state => state.organization.contractorType.isDeleted;

export const getContractorEditData = state => state.organization.contractor.edit.data;
export const getContractorListData = state => state.organization.contractor.list.data;
export const getContractorIsLoading = state => state.organization.contractor.list.isLoading || state.organization.contractor.edit.isLoading;
export const getContractorIsRequestError = state => state.organization.contractor.list.isRequestError || state.organization.contractor.edit.isRequestError;
export const getContractorIsSaved = state => state.organization.contractor.isSaved;
export const getContractorIsDeleted = state => state.organization.contractor.isDeleted;

export const getIsRequestError = state =>
  getContractorTypeIsRequestError(state) ||
  getContractorIsRequestError(state);

export const getIsLoading = state =>
  getContractorTypeIsLoading(state) ||
  getContractorIsLoading(state);

// Export Reducer
export default organizationReducer;
