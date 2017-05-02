import { all } from 'redux-saga/effects';

// Import Saga
import { rootCitizenSaga } from './sagas/CitizenSaga';
import { rootCitizenDocumentSaga } from './sagas/CitizenDocumentSaga';
import { rootCitizenDocumentAttachmentSaga } from './sagas/CitizenDocumentAttachmentSaga';

// Export Saga
export default all([
  rootCitizenSaga,
  rootCitizenDocumentSaga,
  rootCitizenDocumentAttachmentSaga,
]);
