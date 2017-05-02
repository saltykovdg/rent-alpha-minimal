import { all } from 'redux-saga/effects';

// Import Saga
import { rootCalculationTypeSaga } from './sagas/CalculationTypeSaga';
import { rootMeasurementUnitSaga } from './sagas/MeasurementUnitSaga';
import { rootParameterTypeSaga } from './sagas/ParameterTypeSaga';
import { rootDocumentTypeSaga } from './sagas/DocumentTypeSaga';
import { rootGenderTypeSaga } from './sagas/GenderTypeSaga';
import { rootRegistrationTypeSaga } from './sagas/RegistrationTypeSaga';
import { rootMeterTypeSaga } from './sagas/MeterTypeSaga';
import { rootWorkingPeriodSaga } from './sagas/WorkingPeriodSaga';

// Export Saga
export default all([
  rootCalculationTypeSaga,
  rootMeasurementUnitSaga,
  rootParameterTypeSaga,
  rootDocumentTypeSaga,
  rootGenderTypeSaga,
  rootRegistrationTypeSaga,
  rootMeterTypeSaga,
  rootWorkingPeriodSaga,
]);
