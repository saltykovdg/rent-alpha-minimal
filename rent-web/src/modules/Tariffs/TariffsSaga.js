import { all } from 'redux-saga/effects';

// Import Saga
import { rootTariffSaga } from './sagas/TariffSaga';
import { rootTariffValueSaga } from './sagas/TariffValueSaga';

// Export Saga
export default all([
  rootTariffSaga,
  rootTariffValueSaga,
]);
