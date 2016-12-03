import { rootAddressSaga } from './modules/Address/AddressSaga';
import { rootOrganizationSaga } from './modules/Organization/OrganizationSaga';
import rootServiceSaga from './modules/Service/ServiceSaga';
import rootConstantsSaga from './modules/Constants/ConstantsSaga';

export default function* rootSaga() {
  yield [
    ...rootAddressSaga,
    ...rootOrganizationSaga,
    ...rootServiceSaga,
    ...rootConstantsSaga,
  ];
}
