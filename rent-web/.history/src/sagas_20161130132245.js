import { rootAddressSaga } from './modules/Address/AddressSaga';
import { rootOrganizationSaga } from './modules/Organization/OrganizationSaga';
import rootServiceSaga from './modules/Service/ServiceSaga';

export default function* rootSaga() {
  yield [
    ...rootAddressSaga,
    ...rootOrganizationSaga,
    ...rootServiceSaga,
  ];
}
