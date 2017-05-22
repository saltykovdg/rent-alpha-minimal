import { all } from 'redux-saga/effects';

// Import Saga
import { rootAccountSaga } from './sagas/AccountSaga';
import { rootAccountParameterSaga } from './sagas/AccountParameterSaga';
import { rootAccountServiceSaga } from './sagas/AccountServiceSaga';
import { rootAccountOwnerSaga } from './sagas/AccountOwnerSaga';
import { rootAccountOwnerDocumentAttachmentSaga } from './sagas/AccountOwnerDocumentAttachmentSaga';
import { rootAccountRegisteredSaga } from './sagas/AccountRegisteredSaga';
import { rootAccountRegisteredDocumentAttachmentSaga } from './sagas/AccountRegisteredDocumentAttachmentSaga';
import { rootAccountMeterSaga } from './sagas/AccountMeterSaga';
import { rootAccountPaymentSaga } from './sagas/AccountPaymentSaga';
import { rootAccountRecalculationSaga } from './sagas/AccountRecalculationSaga';

// Export Saga
export default all([
  rootAccountSaga,
  rootAccountParameterSaga,
  rootAccountServiceSaga,
  rootAccountOwnerSaga,
  rootAccountOwnerDocumentAttachmentSaga,
  rootAccountRegisteredSaga,
  rootAccountRegisteredDocumentAttachmentSaga,
  rootAccountMeterSaga,
  rootAccountPaymentSaga,
  rootAccountRecalculationSaga,
]);
