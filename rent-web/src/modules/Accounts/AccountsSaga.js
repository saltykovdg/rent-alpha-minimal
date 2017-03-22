// Import Saga
import { rootAccountSaga } from './sagas/AccountSaga';
import { rootAccountParameterSaga } from './sagas/AccountParameterSaga';
import { rootAccountServiceSaga } from './sagas/AccountServiceSaga';
import { rootAccountOwnerSaga } from './sagas/AccountOwnerSaga';
import { rootAccountOwnerDocumentAttachmentSaga } from './sagas/AccountOwnerDocumentAttachmentSaga';
import { rootAccountRegisteredSaga } from './sagas/AccountRegisteredSaga';
import { rootAccountRegisteredDocumentAttachmentSaga } from './sagas/AccountRegisteredDocumentAttachmentSaga';
import { rootAccountMeterSaga } from './sagas/AccountMeterSaga';

// Export Saga
export default [
  rootAccountSaga,
  rootAccountParameterSaga,
  rootAccountServiceSaga,
  rootAccountOwnerSaga,
  rootAccountOwnerDocumentAttachmentSaga,
  rootAccountRegisteredSaga,
  rootAccountRegisteredDocumentAttachmentSaga,
  rootAccountMeterSaga,
];
