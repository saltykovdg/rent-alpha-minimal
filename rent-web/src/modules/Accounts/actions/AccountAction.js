export const GET_ACCOUNTS = 'GET_ACCOUNTS';
export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS';
export const GET_ACCOUNTS_FAILED = 'GET_ACCOUNTS_FAILED';
export const GET_ACCOUNT = 'GET_ACCOUNT';
export const GET_ACCOUNT_CARD = 'GET_ACCOUNT_CARD';
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS';
export const GET_ACCOUNT_FAILED = 'GET_ACCOUNT_FAILED';
export const SAVE_ACCOUNT = 'SAVE_ACCOUNT';
export const SAVE_ACCOUNT_SUCCESS = 'SAVE_ACCOUNT_SUCCESS';
export const SAVE_ACCOUNT_FAILED = 'SAVE_ACCOUNT_FAILED';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILED = 'DELETE_ACCOUNT_FAILED';
export const NEW_ACCOUNT = 'NEW_ACCOUNT';
export const FIND_ACCOUNTS_BY_ACCOUNT_NUMBER = 'FIND_ACCOUNTS_BY_ACCOUNT_NUMBER';
export const FIND_ACCOUNTS = 'FIND_ACCOUNTS';

// parameters
export const ADD_NEW_PARAMETER_TO_ACCOUNT = 'ADD_NEW_PARAMETER_TO_ACCOUNT';
export const EDIT_PARAMETER_IN_ACCOUNT = 'EDIT_PARAMETER_IN_ACCOUNT';
export const REMOVE_PARAMETER_FROM_ACCOUNT = 'REMOVE_PARAMETER_FROM_ACCOUNT';

// services
export const ADD_NEW_SERVICE_TO_ACCOUNT = 'ADD_NEW_SERVICE_TO_ACCOUNT';
export const EDIT_SERVICE_IN_ACCOUNT = 'EDIT_SERVICE_IN_ACCOUNT';
export const REMOVE_SERVICE_FROM_ACCOUNT = 'REMOVE_SERVICE_FROM_ACCOUNT';

// owners
export const ADD_NEW_OWNER_TO_ACCOUNT = 'ADD_NEW_OWNER_TO_ACCOUNT';
export const EDIT_OWNER_IN_ACCOUNT = 'EDIT_OWNER_IN_ACCOUNT';
export const REMOVE_OWNER_FROM_ACCOUNT = 'REMOVE_OWNER_FROM_ACCOUNT';

// owners attachments
export const ADD_NEW_ATTACHMENT_TO_OWNER = 'ADD_NEW_ATTACHMENT_TO_OWNER';
export const EDIT_ATTACHMENT_IN_OWNER = 'EDIT_ATTACHMENT_IN_OWNER';
export const REMOVE_ATTACHMENT_FROM_OWNER = 'REMOVE_ATTACHMENT_FROM_OWNER';

// registered
export const ADD_NEW_REGISTERED_TO_ACCOUNT = 'ADD_NEW_REGISTERED_TO_ACCOUNT';
export const EDIT_REGISTERED_IN_ACCOUNT = 'EDIT_REGISTERED_IN_ACCOUNT';
export const REMOVE_REGISTERED_FROM_ACCOUNT = 'REMOVE_REGISTERED_FROM_ACCOUNT';

// registered attachments
export const ADD_NEW_ATTACHMENT_TO_REGISTERED = 'ADD_NEW_ATTACHMENT_TO_REGISTERED';
export const EDIT_ATTACHMENT_IN_REGISTERED = 'EDIT_ATTACHMENT_IN_REGISTERED';
export const REMOVE_ATTACHMENT_FROM_REGISTERED = 'REMOVE_ATTACHMENT_FROM_REGISTERED';

// meters
export const ADD_NEW_METER_TO_ACCOUNT = 'ADD_NEW_METER_TO_ACCOUNT';
export const EDIT_METER_IN_ACCOUNT = 'EDIT_METER_IN_ACCOUNT';
export const REMOVE_METER_FROM_ACCOUNT = 'REMOVE_METER_FROM_ACCOUNT';

// calculations
export const CLEAR_LOCAL_DATA_ACCOUNT_CALCULATIONS = 'CLEAR_LOCAL_DATA_ACCOUNT_CALCULATIONS';
export const GET_ACCOUNT_CALCULATIONS = 'GET_ACCOUNT_CALCULATIONS';
export const GET_ACCOUNT_CALCULATIONS_SUCCESS = 'GET_ACCOUNT_CALCULATIONS_SUCCESS';
export const GET_ACCOUNT_CALCULATIONS_FAILED = 'GET_ACCOUNT_CALCULATIONS_FAILED';

export const CALCULATE_ACCOUNT = 'CALCULATE_ACCOUNT';
export const CALCULATE_ACCOUNT_SUCCESS = 'CALCULATE_ACCOUNT_SUCCESS';
export const CALCULATE_ACCOUNT_FAILED = 'CALCULATE_ACCOUNT_FAILED';

export const DOWNLOAD_ACCOUNT_REPORT_UPD = 'DOWNLOAD_ACCOUNT_REPORT_UPD';
export const DOWNLOAD_ACCOUNT_REPORT_UPD_SUCCESS = 'DOWNLOAD_ACCOUNT_REPORT_UPD_SUCCESS';
export const DOWNLOAD_ACCOUNT_REPORT_UPD_FAILED = 'DOWNLOAD_ACCOUNT_REPORT_UPD_FAILED';

export const getAccounts = (page = 0) => {
  return {
    type: GET_ACCOUNTS,
    page,
  };
};

export const getAccountsSuccess = (data) => {
  return {
    type: GET_ACCOUNTS_SUCCESS,
    data,
  };
};

export const getAccountsFailed = () => {
  return {
    type: GET_ACCOUNTS_FAILED,
  };
};

export const getAccount = (id) => {
  return {
    type: GET_ACCOUNT,
    id,
  };
};

export const getAccountCard = (id, workingPeriodId = '') => {
  return {
    type: GET_ACCOUNT_CARD,
    id,
    workingPeriodId,
  };
};

export const getAccountSuccess = (data) => {
  return {
    type: GET_ACCOUNT_SUCCESS,
    data,
  };
};

export const getAccountFailed = (id) => {
  return {
    type: GET_ACCOUNT_FAILED,
    id,
  };
};

export const saveAccount = (object) => {
  return {
    type: SAVE_ACCOUNT,
    object,
  };
};

export const saveAccountSuccess = (data) => {
  return {
    type: SAVE_ACCOUNT_SUCCESS,
    data,
  };
};

export const saveAccountFailed = (data, showError = true) => {
  return {
    type: SAVE_ACCOUNT_FAILED,
    data,
    showError,
  };
};

export const deleteAccount = (object, accountNumber = '', lastName = '', street = '', house = '', apartment = '', page = 0) => {
  return {
    type: DELETE_ACCOUNT,
    object,
    accountNumber,
    lastName,
    street,
    house,
    apartment,
    page,
  };
};

export const deleteAccountSuccess = (object) => {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    object,
  };
};

export const deleteAccountFailed = (data) => {
  return {
    type: DELETE_ACCOUNT_FAILED,
    data,
  };
};

export const newAccount = () => {
  return {
    type: NEW_ACCOUNT,
  };
};

export const findAccountsByAccountNumber = (accountNumber = '', page = 0) => {
  return {
    type: FIND_ACCOUNTS_BY_ACCOUNT_NUMBER,
    accountNumber,
    page,
  };
};
export const findAccounts = (accountNumber = '', lastName = '', street = '', house = '', apartment = '', page = 0) => {
  return {
    type: FIND_ACCOUNTS,
    accountNumber,
    lastName,
    street,
    house,
    apartment,
    page,
  };
};

// parameters
export const addNewParameterToAccount = (parameter) => {
  return {
    type: ADD_NEW_PARAMETER_TO_ACCOUNT,
    parameter,
  };
};
export const editParameterInAccount = (parameter) => {
  return {
    type: EDIT_PARAMETER_IN_ACCOUNT,
    parameter,
  };
};
export const removeParameterFromAccount = (parameter) => {
  return {
    type: REMOVE_PARAMETER_FROM_ACCOUNT,
    parameter,
  };
};

// services
export const addNewServiceToAccount = (service) => {
  return {
    type: ADD_NEW_SERVICE_TO_ACCOUNT,
    service,
  };
};
export const editServiceInAccount = (service) => {
  return {
    type: EDIT_SERVICE_IN_ACCOUNT,
    service,
  };
};
export const removeServiceFromAccount = (service) => {
  return {
    type: REMOVE_SERVICE_FROM_ACCOUNT,
    service,
  };
};

// owners
export const addNewOwnerToAccount = (owner) => {
  return {
    type: ADD_NEW_OWNER_TO_ACCOUNT,
    owner,
  };
};
export const editOwnerInAccount = (owner) => {
  return {
    type: EDIT_OWNER_IN_ACCOUNT,
    owner,
  };
};
export const removeOwnerFromAccount = (owner) => {
  return {
    type: REMOVE_OWNER_FROM_ACCOUNT,
    owner,
  };
};

// owners attachments
export const addNewAttachmentToOwner = (owner, attachment) => {
  return {
    type: ADD_NEW_ATTACHMENT_TO_OWNER,
    owner,
    attachment,
  };
};
export const editAttachmentInOwner = (owner, attachment) => {
  return {
    type: EDIT_ATTACHMENT_IN_OWNER,
    owner,
    attachment,
  };
};
export const removeAttachmentFromOwner = (owner, attachment) => {
  return {
    type: REMOVE_ATTACHMENT_FROM_OWNER,
    owner,
    attachment,
  };
};

// registered
export const addNewRegisteredToAccount = (registered) => {
  return {
    type: ADD_NEW_REGISTERED_TO_ACCOUNT,
    registered,
  };
};
export const editRegisteredInAccount = (registered) => {
  return {
    type: EDIT_REGISTERED_IN_ACCOUNT,
    registered,
  };
};
export const removeRegisteredFromAccount = (registered) => {
  return {
    type: REMOVE_REGISTERED_FROM_ACCOUNT,
    registered,
  };
};

// registered attachments
export const addNewAttachmentToRegistered = (registered, attachment) => {
  return {
    type: ADD_NEW_ATTACHMENT_TO_REGISTERED,
    registered,
    attachment,
  };
};
export const editAttachmentInRegistered = (registered, attachment) => {
  return {
    type: EDIT_ATTACHMENT_IN_REGISTERED,
    registered,
    attachment,
  };
};
export const removeAttachmentFromRegistered = (registered, attachment) => {
  return {
    type: REMOVE_ATTACHMENT_FROM_REGISTERED,
    registered,
    attachment,
  };
};

// meters
export const addNewMeterToAccount = (meter) => {
  return {
    type: ADD_NEW_METER_TO_ACCOUNT,
    meter,
  };
};
export const editMeterInAccount = (meter) => {
  return {
    type: EDIT_METER_IN_ACCOUNT,
    meter,
  };
};
export const removeMeterFromAccount = (meter) => {
  return {
    type: REMOVE_METER_FROM_ACCOUNT,
    meter,
  };
};

// calculations
export const getAccountCalculations = (accountId = '', workingPeriodId = '') => {
  return {
    type: GET_ACCOUNT_CALCULATIONS,
    accountId,
    workingPeriodId,
  };
};
export const getAccountCalculationsSuccess = (data) => {
  return {
    type: GET_ACCOUNT_CALCULATIONS_SUCCESS,
    data,
  };
};
export const getAccountCalculationsFailed = () => {
  return {
    type: GET_ACCOUNT_CALCULATIONS_FAILED,
  };
};
export const clearLocalDataAccountCalculations = () => {
  return {
    type: CLEAR_LOCAL_DATA_ACCOUNT_CALCULATIONS,
  };
};

export const calculateAccount = (accountId, periodStartId, periodEndId, workingPeriodId) => {
  return {
    type: CALCULATE_ACCOUNT,
    accountId,
    periodStartId,
    periodEndId,
    workingPeriodId,
  };
};
export const calculateAccountSuccess = (data) => {
  return {
    type: CALCULATE_ACCOUNT_SUCCESS,
    data,
  };
};
export const calculateAccountFailed = () => {
  return {
    type: CALCULATE_ACCOUNT_FAILED,
  };
};

export const downloadAccountReportUPD = (accountId, periodStartId, periodEndId) => {
  return {
    type: DOWNLOAD_ACCOUNT_REPORT_UPD,
    accountId,
    periodStartId,
    periodEndId,
  };
};
export const downloadAccountReportUPDSuccess = () => {
  return {
    type: DOWNLOAD_ACCOUNT_REPORT_UPD_SUCCESS,
  };
};
export const downloadAccountReportUPDFailed = () => {
  return {
    type: DOWNLOAD_ACCOUNT_REPORT_UPD_FAILED,
  };
};
