import { all } from 'redux-saga/effects';

// Import Saga
import { rootCommonSaga } from './sagas/CommonSaga';

// Export Saga
export default all([
  rootCommonSaga,
]);
