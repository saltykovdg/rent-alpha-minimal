// Import Saga
import { rootNormSaga } from './sagas/NormSaga';
import { rootNormValueSaga } from './sagas/NormValueSaga';

// Export Saga
export default [
  ...rootNormSaga,
  ...rootNormValueSaga,
];
