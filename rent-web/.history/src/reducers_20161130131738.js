/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import address from './modules/Address/AddressReducer';
import organization from './modules/Organization/OrganizationReducer';
import service from './modules/Services/ServiceReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  address,
  organization,
  service,
  intl,
});
