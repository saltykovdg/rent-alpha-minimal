import { rootAddressSaga } from './modules/Address/AddressSaga';
import { rootOrganizationSaga } from './modules/Organization/OrganizationSaga';
import rootServiceSaga from './modules/Services/ServiceSaga';

export default function* rootSaga() {
  yield [
    ...rootAddressSaga,
    ...rootOrganizationSaga,
    ...rootServiceSaga,
  ];
}
