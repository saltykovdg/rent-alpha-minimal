import * as AccountAction from './../actions/AccountAction';
import * as AccountParameterAction from './../actions/AccountParameterAction';
import * as AccountServiceAction from './../actions/AccountServiceAction';
import * as AccountOwnerDocumentAttachmentAction from './../actions/AccountOwnerDocumentAttachmentAction';
import * as AccountOwnerAction from './../actions/AccountOwnerAction';
import * as AccountRegisteredDocumentAttachmentAction from './../actions/AccountRegisteredDocumentAttachmentAction';
import * as AccountRegisteredAction from './../actions/AccountRegisteredAction';
import * as AccountMeterAction from './../actions/AccountMeterAction';
import * as TariffAction from './../../Tariffs/actions/TariffAction';
import * as AddressActions from './../../Address/AddressActions';
import * as CitizenAction from './../../Citizens/actions/CitizenAction';
import * as MeterAction from './../../Meters/actions/MeterAction';
import { prepareEdit, prepareList, prepareDefault } from './../../../util/ReducerUtil';

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
    case AccountAction.SAVE_ACCOUNT: {
      return prepareEdit(state.account.edit.data, true, false, false, false);
    }
    case AccountAction.FIND_ACCOUNTS_BY_ACCOUNT_NUMBER:
    case AccountAction.FIND_ACCOUNTS:
    case AccountAction.GET_ACCOUNTS:
    case AccountAction.DELETE_ACCOUNT: {
      return prepareList(state.account.list.data, emptyEditData, true, false, false, false);
    }

    case AccountAction.GET_ACCOUNT_SUCCESS: {
      return prepareEdit(action.data, false, false, false, false);
    }
    case AccountAction.GET_ACCOUNTS_SUCCESS: {
      return prepareList(action.data, emptyEditData, false, false, false, false);
    }

    case AccountAction.GET_ACCOUNT_FAILED: {
      return prepareEdit(emptyEditData, false, true, false, false);
    }
    case AccountAction.GET_ACCOUNTS_FAILED: {
      return prepareList(null, emptyEditData, false, true, false, false);
    }

    case AccountAction.SAVE_ACCOUNT_SUCCESS: {
      return prepareList(null, emptyEditData, false, false, true, false);
    }
    case AccountAction.DELETE_ACCOUNT_SUCCESS: {
      return prepareList(state.account.list.data, emptyEditData, false, false, false, true);
    }

    case AccountAction.SAVE_ACCOUNT_FAILED: {
      return prepareEdit(state.account.edit.data, false, action.showError, false, false);
    }
    case AccountAction.DELETE_ACCOUNT_FAILED: {
      return prepareList(state.account.list.data, emptyEditData, false, true, false, false);
    }

    case AccountAction.NEW_ACCOUNT: {
      return prepareEdit(emptyEditData, false, false, false, false);
    }

    case AccountAction.ADD_NEW_PARAMETER_TO_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.parameters.push(action.parameter);
      return prepareEdit(newObj, false, false, false, false);
    }
    case AccountAction.EDIT_PARAMETER_IN_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.parameters = newObj.parameters.filter(parameter => parameter.id !== action.parameter.id);
      newObj.parameters.push(action.parameter);
      return prepareEdit(newObj, false, false, false, false);
    }
    case AccountAction.REMOVE_PARAMETER_FROM_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.parameters = newObj.parameters.filter(parameter => parameter.id !== action.parameter.id);
      return prepareEdit(newObj, false, false, false, false);
    }

    case AccountAction.ADD_NEW_SERVICE_TO_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.services.push(action.service);
      return prepareEdit(newObj, false, false, false, false);
    }
    case AccountAction.EDIT_SERVICE_IN_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.services = newObj.services.filter(service => service.id !== action.service.id);
      newObj.services.push(action.service);
      return prepareEdit(newObj, false, false, false, false);
    }
    case AccountAction.REMOVE_SERVICE_FROM_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.services = newObj.services.filter(service => service.id !== action.service.id);
      return prepareEdit(newObj, false, false, false, false);
    }

    case AccountAction.ADD_NEW_OWNER_TO_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.owners.push(action.owner);
      return prepareEdit(newObj, false, false, false, false);
    }
    case AccountAction.EDIT_OWNER_IN_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.owners = newObj.owners.filter(owner => owner.id !== action.owner.id);
      newObj.owners.push(action.owner);
      return prepareEdit(newObj, false, false, false, false);
    }
    case AccountAction.REMOVE_OWNER_FROM_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.owners = newObj.owners.filter(owner => owner.id !== action.owner.id);
      return prepareEdit(newObj, false, false, false, false);
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
      return prepareEdit(newObj, false, false, false, false);
    }
    case AccountAction.EDIT_REGISTERED_IN_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.registered = newObj.registered.filter(registered => registered.id !== action.registered.id);
      newObj.registered.push(action.registered);
      return prepareEdit(newObj, false, false, false, false);
    }
    case AccountAction.REMOVE_REGISTERED_FROM_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.registered = newObj.registered.filter(registered => registered.id !== action.registered.id);
      return prepareEdit(newObj, false, false, false, false);
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
      return prepareEdit(newObj, false, false, false, false);
    }
    case AccountAction.EDIT_METER_IN_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.meters = newObj.meters.filter(meter => meter.id !== action.meter.id);
      newObj.meters.push(action.meter);
      return prepareEdit(newObj, false, false, false, false);
    }
    case AccountAction.REMOVE_METER_FROM_ACCOUNT: {
      const newObj = state.account.edit.data;
      newObj.meters = newObj.meters.filter(meter => meter.id !== action.meter.id);
      return prepareEdit(newObj, false, false, false, false);
    }

    case AccountMeterAction.SAVE_ACCOUNT_METER:
    case AccountMeterAction.SAVE_ACCOUNT_METER_SUCCESS:
    case AccountMeterAction.SAVE_ACCOUNT_METER_FAILED:
    case MeterAction.CLEAR_LOCAL_DATA_METERS:
    case MeterAction.FIND_METERS_INDIVIDUAL:
    case MeterAction.GET_METERS_SUCCESS:
    case MeterAction.GET_METERS_FAILED:
    case AccountRegisteredAction.SAVE_ACCOUNT_REGISTERED:
    case AccountRegisteredAction.SAVE_ACCOUNT_REGISTERED_SUCCESS:
    case AccountRegisteredAction.SAVE_ACCOUNT_REGISTERED_FAILED:
    case AccountRegisteredDocumentAttachmentAction.SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT:
    case AccountRegisteredDocumentAttachmentAction.SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_SUCCESS:
    case AccountRegisteredDocumentAttachmentAction.SAVE_ACCOUNT_REGISTERED_DOCUMENT_ATTACHMENT_FAILED:
    case AccountOwnerAction.SAVE_ACCOUNT_OWNER:
    case AccountOwnerAction.SAVE_ACCOUNT_OWNER_SUCCESS:
    case AccountOwnerAction.SAVE_ACCOUNT_OWNER_FAILED:
    case AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT:
    case AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS:
    case AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED:
    case AddressActions.CLEAR_LOCAL_DATA_APARTMENTS:
    case AddressActions.FIND_APARTMENTS_BY_BUILDING_ID:
    case AddressActions.GET_APARTMENTS_SUCCESS:
    case AddressActions.GET_APARTMENTS_FAILED:
    case AddressActions.FIND_BUILDINGS_BY_STREET_ID:
    case AddressActions.GET_BUILDINGS_SUCCESS:
    case AddressActions.GET_BUILDINGS_FAILED:
    case TariffAction.CLEAR_LOCAL_DATA_TARIFFS:
    case TariffAction.FIND_TARIFFS_BY_SERVICE_ID:
    case TariffAction.GET_TARIFFS_SUCCESS:
    case TariffAction.GET_TARIFFS_FAILED:
    case CitizenAction.CLEAR_LOCAL_DATA_CITIZENS:
    case CitizenAction.FIND_CITIZENS:
    case CitizenAction.GET_CITIZENS_SUCCESS:
    case CitizenAction.GET_CITIZENS_FAILED:
    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER:
    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER_SUCCESS:
    case AccountParameterAction.SAVE_ACCOUNT_PARAMETER_FAILED:
    case AccountServiceAction.SAVE_ACCOUNT_SERVICE:
    case AccountServiceAction.SAVE_ACCOUNT_SERVICE_SUCCESS:
    case AccountServiceAction.SAVE_ACCOUNT_SERVICE_FAILED: {
      return state.account;
    }

    default:
      return prepareDefault(state.account.list, emptyEditData);
  }
};

/* Selectors */
export const getAccountEditData = state => state.accounts.account.edit.data;
export const getAccountListData = state => state.accounts.account.list.data;
export const getAccountIsLoading = state => state.accounts.account.list.isLoading || state.accounts.account.edit.isLoading;
export const getAccountIsRequestError = state => state.accounts.account.list.isRequestError || state.accounts.account.edit.isRequestError;
export const getAccountIsSaved = state => state.accounts.account.isSaved;
export const getAccountIsDeleted = state => state.accounts.account.isDeleted;
