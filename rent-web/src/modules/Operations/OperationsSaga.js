// Import Saga
import { rootCalculationSaga } from './sagas/CalculationSaga';
import { rootSystemPropertySaga } from './sagas/SystemPropertySaga';

// Export Saga
export default [
  rootCalculationSaga,
  rootSystemPropertySaga,
];
