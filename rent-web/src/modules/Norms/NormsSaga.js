import { all } from 'redux-saga/effects';

// Import Saga
import { rootNormSaga } from './sagas/NormSaga';
import { rootNormValueSaga } from './sagas/NormValueSaga';

// Export Saga
export default all([
  rootNormSaga,
  rootNormValueSaga,
]);
