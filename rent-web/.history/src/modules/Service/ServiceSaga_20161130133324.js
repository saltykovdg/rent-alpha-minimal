// Import Saga
import { rootServiceTypeSaga } from './sagas/ServiceTypeSaga';
import { rootServiceSaga } from './sagas/ServiceSaga';

// Export Saga
export default [
  ...rootServiceTypeSaga,
  ...rootServiceSaga,
];
