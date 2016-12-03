/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import address from './modules/Address/AddressReducer';
import organization from './modules/Organization/OrganizationReducer';
import services from './modules/Services/ServicesReducer';
import constants from './modules/Constants/ConstantsReducer';
import intl from './modules/Intl/IntlReducer';
import tariffs from './modules/Tariffs/TariffsReducer';
import accounts from './modules/Accounts/AccountsReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  intl,
  organization,
  address,
  constants,
  services,
  tariffs,
  accounts,
});
