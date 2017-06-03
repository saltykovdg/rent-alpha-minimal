import { all } from 'redux-saga/effects';

// Import Saga
import { rootLoginSaga } from './sagas/LoginSaga';
import { rootUserSaga } from './sagas/UserSaga';
import { rootRoleSaga } from './sagas/RoleSaga';

// Export Saga
export default all([
  rootLoginSaga,
  rootUserSaga,
  rootRoleSaga,
]);
