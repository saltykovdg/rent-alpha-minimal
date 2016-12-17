// Import Saga
import { rootAccountSaga } from './sagas/AccountSaga';
import { rootAccountParameterSaga } from './sagas/AccountParameterSaga';

// Export Saga
export default [
  ...rootAccountSaga,
  ...rootAccountParameterSaga,
];
