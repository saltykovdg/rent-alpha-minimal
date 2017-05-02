import { all } from 'redux-saga/effects';

// Import Saga
import { rootMeterSaga } from './sagas/MeterSaga';
import { rootMeterValueSaga } from './sagas/MeterValueSaga';

// Export Saga
export default all([
  rootMeterSaga,
  rootMeterValueSaga,
]);
