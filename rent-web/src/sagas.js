import { all } from 'redux-saga/effects';
import { rootAddressSaga } from './modules/Address/AddressSaga';
import { rootOrganizationSaga } from './modules/Organization/OrganizationSaga';
import rootServicesSaga from './modules/Services/ServicesSaga';
import rootConstantsSaga from './modules/Constants/ConstantsSaga';
import rootTariffsSaga from './modules/Tariffs/TariffsSaga';
import rootAccountsSaga from './modules/Accounts/AccountsSaga';
import rootCitizensSaga from './modules/Citizens/CitizensSaga';
import rootNormsSaga from './modules/Norms/NormsSaga';
import rootMetersSaga from './modules/Meters/MetersSaga';
import rootOperationsSaga from './modules/Operations/OperationsSaga';

export default function* rootSaga() {
  yield all([
    rootAddressSaga,
    rootOrganizationSaga,
    rootServicesSaga,
    rootConstantsSaga,
    rootTariffsSaga,
    rootAccountsSaga,
    rootCitizensSaga,
    rootNormsSaga,
    rootMetersSaga,
    rootOperationsSaga,
  ]);
}
