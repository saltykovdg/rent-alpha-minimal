// Import Saga
import { rootCitizenSaga } from './sagas/CitizenSaga';
import { rootCitizenDocumentSaga } from './sagas/CitizenDocumentSaga';

// Export Saga
export default [
  rootCitizenSaga,
  rootCitizenDocumentSaga,
];
