import { all } from 'redux-saga/effects';

// Import Saga
import { rootCalculationSaga } from './sagas/CalculationSaga';
import { rootSystemPropertySaga } from './sagas/SystemPropertySaga';

// Export Saga
export default all([
  rootCalculationSaga,
  rootSystemPropertySaga,
]);
