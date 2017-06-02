import { all } from 'redux-saga/effects';

// Import Saga
import { rootLoginSaga } from './sagas/LoginSaga';

// Export Saga
export default all([
  rootLoginSaga,
]);
