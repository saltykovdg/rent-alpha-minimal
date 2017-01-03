// Import Saga
import { rootCalculationTypeSaga } from './sagas/CalculationTypeSaga';
import { rootMeasurementUnitSaga } from './sagas/MeasurementUnitSaga';
import { rootParameterTypeSaga } from './sagas/ParameterTypeSaga';
import { rootDocumentTypeSaga } from './sagas/DocumentTypeSaga';

// Export Saga
export default [
  ...rootCalculationTypeSaga,
  ...rootMeasurementUnitSaga,
  ...rootParameterTypeSaga,
  ...rootDocumentTypeSaga,
];
