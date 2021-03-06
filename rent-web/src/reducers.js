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
import norms from './modules/Norms/NormsReducer';
import meters from './modules/Meters/MetersReducer';
import operations from './modules/Operations/OperationsReducer';
import security from './modules/Security/SecurityReducer';

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
  norms,
  meters,
  operations,
  security,
});
