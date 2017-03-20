// Import Saga
import { rootCalculationTypeSaga } from './sagas/CalculationTypeSaga';
import { rootMeasurementUnitSaga } from './sagas/MeasurementUnitSaga';
import { rootParameterTypeSaga } from './sagas/ParameterTypeSaga';
import { rootDocumentTypeSaga } from './sagas/DocumentTypeSaga';
import { rootGenderTypeSaga } from './sagas/GenderTypeSaga';
import { rootRegistrationTypeSaga } from './sagas/RegistrationTypeSaga';
import { rootMeterTypeSaga } from './sagas/MeterTypeSaga';

// Export Saga
export default [
  ...rootCalculationTypeSaga,
  ...rootMeasurementUnitSaga,
  ...rootParameterTypeSaga,
  ...rootDocumentTypeSaga,
  ...rootGenderTypeSaga,
  ...rootRegistrationTypeSaga,
  ...rootMeterTypeSaga,
];
