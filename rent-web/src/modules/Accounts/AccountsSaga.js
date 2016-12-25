// Import Saga
import { rootAccountSaga } from './sagas/AccountSaga';
import { rootAccountParameterSaga } from './sagas/AccountParameterSaga';
import { rootAccountServiceSaga } from './sagas/AccountServiceSaga';

// Export Saga
export default [
  ...rootAccountSaga,
  ...rootAccountParameterSaga,
  ...rootAccountServiceSaga,
];
