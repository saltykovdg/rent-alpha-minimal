import { call, put, fork, take, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as OrganizationAction from './../../Organization/OrganizationActions';
import * as AddressAction from './../../Address/AddressActions';
import * as AccountAction from './../actions/AccountAction';
import * as AccountParameterAction from './../actions/AccountParameterAction';
import * as AccountServiceAction from './../actions/AccountServiceAction';
import * as AccountOwnerAction from './../actions/AccountOwnerAction';
import * as AccountOwnerDocumentAttachmentAction from './../actions/AccountOwnerDocumentAttachmentAction';
import * as ParameterTypeAction from './../../Constants/actions/ParameterTypeAction';
import * as ServiceAction from './../../Services/actions/ServiceAction';
import * as DocumentTypeAction from './../../Constants/actions/DocumentTypeAction';
import * as AccountApi from './../api/AccountApi';
import * as AccountPath from './../paths/AccountPath';
import * as ApiCaller from '../../../util/ApiCaller';
import * as ObjectUtil from './../../../util/ObjectUtil';

export function* getAccounts(action) {
  const response = yield call(AccountApi.getAccounts, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountAction.getAccountsSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountAction.getAccountsFailed());
  }
}

export function* watchGetAccounts() {
  yield takeLatest(AccountAction.GET_ACCOUNTS, getAccounts);
}

export function* getAccount(action) {
  const response = yield call(AccountApi.getAccount, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(OrganizationAction.findContractorsByName());
    let sagaAction = yield take([OrganizationAction.GET_CONTRACTORS_SUCCESS, OrganizationAction.GET_CONTRACTORS_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AddressAction.findStreetsByName());
      sagaAction = yield take([AddressAction.GET_STREETS_SUCCESS, AddressAction.GET_STREETS_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AddressAction.findBuildingsByStreetId(response.apartment.building.street.id));
      sagaAction = yield take([AddressAction.GET_BUILDINGS_SUCCESS, AddressAction.GET_BUILDINGS_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AddressAction.findApartmentsByBuildingId(response.apartment.building.id));
      sagaAction = yield take([AddressAction.GET_APARTMENTS_SUCCESS, AddressAction.GET_APARTMENTS_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(ParameterTypeAction.findParameterTypesByName());
      sagaAction = yield take([ParameterTypeAction.GET_PARAMETER_TYPES_SUCCESS, ParameterTypeAction.GET_PARAMETER_TYPES_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(ServiceAction.findServicesByName());
      sagaAction = yield take([ServiceAction.GET_SERVICES_SUCCESS, ServiceAction.GET_SERVICES_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(DocumentTypeAction.findDocumentTypesByName());
      sagaAction = yield take([DocumentTypeAction.GET_DOCUMENT_TYPES_SUCCESS, DocumentTypeAction.GET_DOCUMENT_TYPES_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AccountAction.getAccountSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(AccountAction.getAccountFailed(action.id));
  }
}

export function* watchGetAccount() {
  yield takeLatest(AccountAction.GET_ACCOUNT, getAccount);
}

export function* saveAccount(action) {
  let sagaAction = null;
  const parameters = action.object.parameters;
  const parametersLinks = [];
  const services = action.object.services;
  const servicesLinks = [];
  const owners = action.object.owners;
  const ownersLinks = [];

  // save parameters
  for (let i = 0; i < parameters.length; i += 1) {
    const newItem = ObjectUtil.cloneObject(parameters[i]);
    newItem.parameterType = ObjectUtil.getLink(parameters[i].parameterType);
    yield put(AccountParameterAction.saveAccountParameter(newItem));
    sagaAction = yield take([AccountParameterAction.SAVE_ACCOUNT_PARAMETER_SUCCESS, AccountParameterAction.SAVE_ACCOUNT_PARAMETER_FAILED]);
    if (sagaAction.type === AccountParameterAction.SAVE_ACCOUNT_PARAMETER_SUCCESS) {
      parametersLinks.push(ObjectUtil.getLink(sagaAction.data));
      sagaAction = null;
    } else {
      break;
    }
  }

  // save owners
  for (let i = 0; i < owners.length; i += 1) {
    sagaAction = null;
    const ownerObj = ObjectUtil.cloneObject(owners[i]);
    ownerObj.documentType = ObjectUtil.getLink(owners[i].documentType);
    ownerObj.citizen = ObjectUtil.getLink(owners[i].citizen);

    // save owner attachments
    const documentAttachmentsLinks = [];
    for (let j = 0; j < ownerObj.documentAttachments.length; j += 1) {
      const documentAttachmentObj = ObjectUtil.cloneObject(ownerObj.documentAttachments[j]);
      let attachmentFormData = null;
      if (documentAttachmentObj.file) {
        attachmentFormData = new FormData();
        attachmentFormData.append('file', documentAttachmentObj.file);
      }
      yield put(AccountOwnerDocumentAttachmentAction.saveAccountOwnerDocumentAttachment(documentAttachmentObj, attachmentFormData));
      sagaAction = yield take([
        AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS,
        AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_FAILED,
      ]);
      if (sagaAction.type === AccountOwnerDocumentAttachmentAction.SAVE_ACCOUNT_OWNER_DOCUMENT_ATTACHMENT_SUCCESS) {
        documentAttachmentsLinks.push(ObjectUtil.getLink(sagaAction.data));
        sagaAction = null;
      } else {
        break;
      }
    }

    // save owner
    if (sagaAction == null) {
      ownerObj.documentAttachments = documentAttachmentsLinks;
      yield put(AccountOwnerAction.saveAccountOwner(ownerObj));
      sagaAction = yield take([AccountOwnerAction.SAVE_ACCOUNT_OWNER_SUCCESS, AccountOwnerAction.SAVE_ACCOUNT_OWNER_FAILED]);
      if (sagaAction.type === AccountOwnerAction.SAVE_ACCOUNT_OWNER_SUCCESS) {
        ownersLinks.push(ObjectUtil.getLink(sagaAction.data));
        sagaAction = null;
      } else {
        break;
      }
    }
  }

  // save services
  if (sagaAction == null) {
    sagaAction = null;
    for (let i = 0; i < services.length; i += 1) {
      const newItem = ObjectUtil.cloneObject(services[i]);
      newItem.service = ObjectUtil.getLink(services[i].service);
      newItem.tariff = ObjectUtil.getLink(services[i].tariff);
      yield put(AccountServiceAction.saveAccountService(newItem));
      sagaAction = yield take([AccountServiceAction.SAVE_ACCOUNT_SERVICE_SUCCESS, AccountServiceAction.SAVE_ACCOUNT_SERVICE_FAILED]);
      if (sagaAction.type === AccountServiceAction.SAVE_ACCOUNT_SERVICE_SUCCESS) {
        servicesLinks.push(ObjectUtil.getLink(sagaAction.data));
        sagaAction = null;
      } else {
        break;
      }
    }
  }

  // save account
  if (sagaAction == null) {
    const objectAccount = ObjectUtil.cloneObject(action.object);
    objectAccount.parameters = parametersLinks;
    objectAccount.services = servicesLinks;
    objectAccount.owners = ownersLinks;
    const response = yield call(AccountApi.saveAccount, objectAccount);
    if (response && !response.error && !response.canceled) {
      yield put(AccountAction.saveAccountSuccess(objectAccount));
      yield call(browserHistory.push, AccountPath.ACCOUNT_LIST);
    } else if (!response.canceled) {
      const data = {
        httpStatus: response.status,
        object: action.object,
      };
      yield put(AccountAction.saveAccountFailed(data));
    }
  } else if (sagaAction) {
    const data = {
      httpStatus: sagaAction.data.httpStatus,
      object: action.object,
    };
    yield put(AccountAction.saveAccountFailed(data, false));
  }
}

export function* watchSaveAccount() {
  yield takeLatest(AccountAction.SAVE_ACCOUNT, saveAccount);
}

export function* deleteAccount(action) {
  const response = yield call(AccountApi.deleteAccount, action.object);
  if (response === '') {
    yield put(AccountAction.deleteAccountSuccess(action.object));
    yield put(AccountAction.getAccounts());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AccountAction.deleteAccountFailed(data));
  }
}

export function* watchDeleteAccount() {
  yield takeLatest(AccountAction.DELETE_ACCOUNT, deleteAccount);
}

export function* newAccount() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(OrganizationAction.findContractorsByName());
  let sagaAction = yield take([OrganizationAction.GET_CONTRACTORS_SUCCESS, OrganizationAction.GET_CONTRACTORS_FAILED, LOCATION_CHANGE]);
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(AddressAction.findStreetsByName());
    sagaAction = yield take([AddressAction.GET_STREETS_SUCCESS, OrganizationAction.GET_STREETS_FAILED, LOCATION_CHANGE]);
  }
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(AddressAction.findBuildingsByStreetId());
    sagaAction = yield take([AddressAction.GET_BUILDINGS_SUCCESS, AddressAction.GET_BUILDINGS_FAILED, LOCATION_CHANGE]);
  }
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(AddressAction.findApartmentsByBuildingId());
    sagaAction = yield take([AddressAction.GET_APARTMENTS_SUCCESS, AddressAction.GET_APARTMENTS_FAILED, LOCATION_CHANGE]);
  }
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(ParameterTypeAction.findParameterTypesByName());
    sagaAction = yield take([ParameterTypeAction.GET_PARAMETER_TYPES_SUCCESS, ParameterTypeAction.GET_PARAMETER_TYPES_FAILED, LOCATION_CHANGE]);
  }
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(DocumentTypeAction.findDocumentTypesByName());
    sagaAction = yield take([DocumentTypeAction.GET_DOCUMENT_TYPES_SUCCESS, DocumentTypeAction.GET_DOCUMENT_TYPES_FAILED, LOCATION_CHANGE]);
  }
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(ServiceAction.findServicesByName());
    sagaAction = yield take([ServiceAction.GET_SERVICES_SUCCESS, ServiceAction.GET_SERVICES_FAILED, LOCATION_CHANGE]);
  }
}

export function* watchNewAccount() {
  yield takeLatest(AccountAction.NEW_ACCOUNT, newAccount);
}

export function* findAccountsByAccountNumber(action) {
  const response = yield call(AccountApi.findAccountsByAccountNumber, action.accountNumber, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AccountAction.getAccountsSuccess(response));
  } else if (!response.canceled) {
    yield put(AccountAction.getAccountsFailed());
  }
}

export function* watchFindAccountsByAccountNumber() {
  yield takeLatest(AccountAction.FIND_ACCOUNTS_BY_ACCOUNT_NUMBER, findAccountsByAccountNumber);
}

export const rootAccountSaga = [
  fork(watchGetAccounts),
  fork(watchGetAccount),
  fork(watchSaveAccount),
  fork(watchDeleteAccount),
  fork(watchNewAccount),
  fork(watchFindAccountsByAccountNumber),
];
