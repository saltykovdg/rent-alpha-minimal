/**
 * Root Reducer
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import Reducers
import address from './modules/Address/AddressReducer';
import organization from './modules/Organization/OrganizationReducer';
import services from './modules/Services/ServicesReducer';
import constants from './modules/Constants/ConstantsReducer';
import intl from './modules/Intl/IntlReducer';
import tariffs from './modules/Tariffs/TariffsReducer';
import accounts from './modules/Accounts/AccountsReducer';
import citizens from './modules/Citizens/CitizensReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  routing: routerReducer,
  intl,
  organization,
  address,
  constants,
  services,
  tariffs,
  accounts,
  citizens,
});
