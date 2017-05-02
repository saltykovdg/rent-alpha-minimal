import { all } from 'redux-saga/effects';

// Import Saga
import { rootServiceTypeSaga } from './sagas/ServiceTypeSaga';
import { rootServiceSaga } from './sagas/ServiceSaga';

// Export Saga
export default all([
  rootServiceTypeSaga,
  rootServiceSaga,
]);
