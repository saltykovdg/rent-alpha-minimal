import { rootAddressSaga } from './modules/Address/AddressSaga';
import { rootOrganizationSaga } from './modules/Organization/OrganizationSaga';
import rootServicesSaga from './modules/Services/ServicesSaga';
import rootConstantsSaga from './modules/Constants/ConstantsSaga';

export default function* rootSaga() {
  yield [
    ...rootAddressSaga,
    ...rootOrganizationSaga,
    ...rootServicesSaga,
    ...rootConstantsSaga,
  ];
}
