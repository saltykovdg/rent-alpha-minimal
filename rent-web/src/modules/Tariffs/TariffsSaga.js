// Import Saga
import { rootTariffSaga } from './sagas/TariffSaga';
import { rootTariffValueSaga } from './sagas/TariffValueSaga';

// Export Saga
export default [
  ...rootTariffSaga,
  ...rootTariffValueSaga,
];
