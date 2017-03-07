// Import Saga
import { rootCitizenSaga } from './sagas/CitizenSaga';
import { rootCitizenDocumentSaga } from './sagas/CitizenDocumentSaga';
import { rootCitizenDocumentAttachmentSaga } from './sagas/CitizenDocumentAttachmentSaga';

// Export Saga
export default [
  rootCitizenSaga,
  rootCitizenDocumentSaga,
  rootCitizenDocumentAttachmentSaga,
];
