// Import Saga
import { rootCalculationTypeSaga } from './sagas/CalculationTypeSaga';
import { rootMeasurementUnitSaga } from './sagas/MeasurementUnitSaga';

// Export Saga
export default [
  ...rootCalculationTypeSaga,
  ...rootMeasurementUnitSaga,
];
