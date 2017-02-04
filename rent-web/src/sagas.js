import { rootAddressSaga } from './modules/Address/AddressSaga';
import { rootOrganizationSaga } from './modules/Organization/OrganizationSaga';
import rootServicesSaga from './modules/Services/ServicesSaga';
import rootConstantsSaga from './modules/Constants/ConstantsSaga';
import rootTariffsSaga from './modules/Tariffs/TariffsSaga';
import rootAccountsSaga from './modules/Accounts/AccountsSaga';
import rootCitizensSaga from './modules/Citizens/CitizensSaga';

export default function* rootSaga() {
  yield [
    ...rootAddressSaga,
    ...rootOrganizationSaga,
    ...rootServicesSaga,
    ...rootConstantsSaga,
    ...rootTariffsSaga,
    ...rootAccountsSaga,
    ...rootCitizensSaga,
  ];
}
