import * as AccountAction from './../actions/AccountAction';
import {
  prepareListLoading,
  prepareEditLoading,
  prepareSuccess,
  prepareListFailed,
  prepareEditFailed,
  prepareSaveSuccess,
  prepareDeleteSuccess,
} from './../../../util/ReducerUtil';

export const emptyParameter = {
  id: '',
  parameterType: {
    id: '',
    name: '',
  },
  value: 0,
  dateStart: null,
  dateEnd: null,
};

export const emptyService = {
  id: '',
  service: {
    id: '',
    name: '',
  },
  dateStart: null,
  dateEnd: null,
};

export const emptyOwner = {
  id: '',
  citizen: null,
  documentType: {
    id: '',
    name: '',
  },
  documentSeries: '',
  documentNumber: '',
  documentIssuingAuthority: '',
  documentDateIssue: '',
  documentAttachments: [],
  dateStart: null,
  dateEnd: null,
};

export const emptyRegistered = {
  id: '',
  citizen: null,
  registrationType: {
    id: '',
    name: '',
  },
  documentAttachments: [],
  dateStart: null,
  dateEnd: null,
};

export const emptyDocumentAttachment = {
  id: '',
  name: '',
  urlLink: '',
};

export const emptyMeter = {
  id: '',
  meter: null,
  dateStart: null,
  dateEnd: null,
};

const emptyEditData = {
  id: '',
  accountNumber: '',
  dateOpen: null,
  dateClose: null,
  contractor: {
    id: '',
  },
  apartment: {
    id: '',
    building: {
      id: '',
      street: {
        id: '',
        streetType: {
          id: '',
          name: '',
          nameShort: '',
        },
      },
    },
  },
  parameters: [],
  services: [],
  owners: [],
  registered: [],
  meters: [],
};

export const accountReducer = (state, action) => {
  switch (action.type) {
    case AccountAction.GET_ACCOUNT:
    case AccountAction.GET_ACCOUNT_CARD: {
      return prepareEditLoading(state.account.list.data, emptyEditData);
    }

    case AccountAction.DOWNLOAD_ACCOUNT_REPORT_UPD:
    case AccountAction.SAVE_ACCOUNT: {
      return prepareEditLoading(state.account.list.data, state.account.edit.data);
    }

    case AccountAction.FIND_ACCOUNTS_BY_ACCOUNT_NUMBER:
    case AccountAction.FIND_ACCOUNTS:
    case AccountAction.GET_ACCOUNTS:
    case AccountAction.DELETE_ACCOUNT: {
      return prepareListLoading(state.account.list.data, emptyEditData);
    }

    case AccountAction.GET_ACCOUNT_SUCCESS: {
      return prepareSuccess(state.account.list.data, action.data);
    }
    case AccountAction.GET_ACCOUNTS_SUCCESS: {
      return prepareSuccess(action.data, emptyEditData);
    }

    case AccountAction.GET_ACCOUNT_FAILED: {
      return prepareEditFailed(state.account.list.data, emptyEditData);
    }
    case AccountAction.GET_ACCOUNTS_FAILED: {
      return prepareListFailed(state.account.list.data, emptyEditData);
    }

    case AccountAction.SAVE_ACCOUNT_SUCCESS: {
      return prepareSaveSuccess(state.account.list.data, emptyEditData);
    }
    case AccountAction.DELETE_ACCOUNT_SUCCESS: {
      return prepareDeleteSuccess(state.account.list.data, emptyEditData);
    }

    case AccountAction.SAVE_ACCOUNT_FAILED: {
      return prepareEditFailed(state.account.list.data, state.account.edit.data, action.showError);
    }
    case AccountAction.DELETE_ACCOUNT_FAILED: {
      return prepareListFailed(state.account.list.data, emptyEditData);
    }

    case AccountAction.NEW_ACCOUNT: {
      return prepareSuccess(state.account.list.data, emptyEditData);
    }

    case AccountAction.ADD_NEW_PARAMETER_TO_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.parameters.push(action.parameter);
      return prepareSuccess(state.account.list.data, newObj);
    }
    case AccountAction.EDIT_PARAMETER_IN_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.parameters = newObj.parameters.filter(parameter => parameter.id !== action.parameter.id);
      newObj.parameters.push(action.parameter);
      return prepareSuccess(state.account.list.data, newObj);
    }
    case AccountAction.REMOVE_PARAMETER_FROM_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.parameters = newObj.parameters.filter(parameter => parameter.id !== action.parameter.id);
      return prepareSuccess(state.account.list.data, newObj);
    }

    case AccountAction.ADD_NEW_SERVICE_TO_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.services.push(action.service);
      return prepareSuccess(state.account.list.data, newObj);
    }
    case AccountAction.EDIT_SERVICE_IN_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.services = newObj.services.filter(service => service.id !== action.service.id);
      newObj.services.push(action.service);
      return prepareSuccess(state.account.list.data, newObj);
    }
    case AccountAction.REMOVE_SERVICE_FROM_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.services = newObj.services.filter(service => service.id !== action.service.id);
      return prepareSuccess(state.account.list.data, newObj);
    }

    case AccountAction.ADD_NEW_OWNER_TO_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.owners.push(action.owner);
      return prepareSuccess(state.account.list.data, newObj);
    }
    case AccountAction.EDIT_OWNER_IN_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.owners = newObj.owners.filter(owner => owner.id !== action.owner.id);
      newObj.owners.push(action.owner);
      return prepareSuccess(state.account.list.data, newObj);
    }
    case AccountAction.REMOVE_OWNER_FROM_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.owners = newObj.owners.filter(owner => owner.id !== action.owner.id);
      return prepareSuccess(state.account.list.data, newObj);
    }

    case AccountAction.ADD_NEW_ATTACHMENT_TO_OWNER: {
      const newObj = action.owner;
      newObj.documentAttachments.push(action.attachment);
      return state.account;
    }
    case AccountAction.EDIT_ATTACHMENT_IN_OWNER: {
      const newObj = action.owner;
      newObj.documentAttachments = newObj.documentAttachments.filter(attachment => attachment.id !== action.attachment.id);
      newObj.documentAttachments.push(action.attachment);
      return state.account;
    }
    case AccountAction.REMOVE_ATTACHMENT_FROM_OWNER: {
      const newObj = action.owner;
      newObj.documentAttachments = newObj.documentAttachments.filter(attachment => attachment.id !== action.attachment.id);
      return state.account;
    }

    case AccountAction.ADD_NEW_REGISTERED_TO_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.registered.push(action.registered);
      return prepareSuccess(state.account.list.data, newObj);
    }
    case AccountAction.EDIT_REGISTERED_IN_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.registered = newObj.registered.filter(registered => registered.id !== action.registered.id);
      newObj.registered.push(action.registered);
      return prepareSuccess(state.account.list.data, newObj);
    }
    case AccountAction.REMOVE_REGISTERED_FROM_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.registered = newObj.registered.filter(registered => registered.id !== action.registered.id);
      return prepareSuccess(state.account.list.data, newObj);
    }

    case AccountAction.ADD_NEW_ATTACHMENT_TO_REGISTERED: {
      const newObj = action.registered;
      newObj.documentAttachments.push(action.attachment);
      return state.account;
    }
    case AccountAction.EDIT_ATTACHMENT_IN_REGISTERED: {
      const newObj = action.registered;
      newObj.documentAttachments = newObj.documentAttachments.filter(attachment => attachment.id !== action.attachment.id);
      newObj.documentAttachments.push(action.attachment);
      return state.account;
    }
    case AccountAction.REMOVE_ATTACHMENT_FROM_REGISTERED: {
      const newObj = action.registered;
      newObj.documentAttachments = newObj.documentAttachments.filter(attachment => attachment.id !== action.attachment.id);
      return state.account;
    }

    case AccountAction.ADD_NEW_METER_TO_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.meters.push(action.meter);
      return prepareSuccess(state.account.list.data, newObj);
    }
    case AccountAction.EDIT_METER_IN_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.meters = newObj.meters.filter(meter => meter.id !== action.meter.id);
      newObj.meters.push(action.meter);
      return prepareSuccess(state.account.list.data, newObj);
    }
    case AccountAction.REMOVE_METER_FROM_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.meters = newObj.meters.filter(meter => meter.id !== action.meter.id);
      return prepareSuccess(state.account.list.data, newObj);
    }

    case AccountAction.DOWNLOAD_ACCOUNT_REPORT_UPD_SUCCESS: {
      return prepareSuccess(state.account.list.data, state.account.edit.data);
    }
    case AccountAction.DOWNLOAD_ACCOUNT_REPORT_UPD_FAILED: {
      return prepareEditFailed(state.account.list.data, state.account.edit.data);
    }

    default:
      return state.account;
  }
};

/* Selectors */
export const getAccountEditData = state => state.accounts.account.edit.data;
export const getAccountListData = state => state.accounts.account.list.data;
export const getAccountIsLoading = state => state.accounts.account.list.isLoading || state.accounts.account.edit.isLoading;
export const getAccountIsRequestError = state => state.accounts.account.list.isRequestError || state.accounts.account.edit.isRequestError;
export const getAccountIsSaved = state => state.accounts.account.isSaved;
export const getAccountIsDeleted = state => state.accounts.account.isDeleted;
