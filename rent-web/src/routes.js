import React from 'react';
import { Route, IndexRoute } from 'react-router';
import NProgress from 'nprogress';

import App from './modules/App/App';

import * as AddressPath from './modules/Address/AddressPaths';
import * as OrganizationPath from './modules/Organization/OrganizationPaths';
import * as ServiceTypePath from './modules/Services/paths/ServiceTypePath';
import * as ServicePath from './modules/Services/paths/ServicePath';
import * as TariffPath from './modules/Tariffs/paths/TariffPath';
import * as CalculationTypePath from './modules/Constants/paths/CalculationTypePath';
import * as RecalculationTypePath from './modules/Constants/paths/RecalculationTypePath';
import * as MeasurementUnitPath from './modules/Constants/paths/MeasurementUnitPath';
import * as DocumentTypePath from './modules/Constants/paths/DocumentTypePath';
import * as RegistrationTypePath from './modules/Constants/paths/RegistrationTypePath';
import * as MeterTypePath from './modules/Constants/paths/MeterTypePath';
import * as ParameterTypePath from './modules/Constants/paths/ParameterTypePath';
import * as GenderTypePath from './modules/Constants/paths/GenderTypePath';
import * as AccountPath from './modules/Accounts/paths/AccountPath';
import * as CitizenPath from './modules/Citizens/paths/CitizenPath';
import * as NormPath from './modules/Norms/paths/NormPath';
import * as MeterPath from './modules/Meters/paths/MeterPath';
import * as CalculationPath from './modules/Operations/paths/CalculationPath';
import * as LoginPath from './modules/Security/paths/LoginPath';
import * as UserPath from './modules/Security/paths/UserPath';
import * as RolePath from './modules/Security/paths/RolePath';

import * as AuthUtil from './util/AuthUtil';
import * as RoleType from './util/RoleType';

const validate = (next, replace, callback) => {
  const authorization = AuthUtil.getAuthorization();
  if (!AuthUtil.checkJWT(authorization) && next.location.pathname !== LoginPath.LOGIN) {
    AuthUtil.logout();
    replace(LoginPath.LOGIN);
  } else if (AuthUtil.checkJWT(authorization) && next.location.pathname === LoginPath.LOGIN) {
    replace('/');
  } else if (AuthUtil.getUserRole() !== RoleType.ROLE_ADMIN &&
            (next.location.pathname.indexOf(RolePath.ROLE_EDIT) !== -1 ||
            next.location.pathname.indexOf(RolePath.ROLE_LIST) !== -1 ||
            next.location.pathname.indexOf(UserPath.USER_EDIT) !== -1 ||
            next.location.pathname.indexOf(UserPath.USER_LIST) !== -1)) {
    replace('/');
  }
  callback();
};

const onChange = (prevState, nextState, replace, callback) => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
  callback();
};

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" onEnter={validate} onChange={onChange}>
    <Route component={App}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/App/pages/WelcomePage').default);
          });
        }}
      />

      { /* Organization */ }
      <Route
        path={OrganizationPath.CONTRACTOR_TYPE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Organization/pages/ContractorTypeListPage').default);
          });
        }}
      />
      <Route
        path={`${OrganizationPath.CONTRACTOR_TYPE_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Organization/pages/ContractorTypeEditPage').default);
          });
        }}
      />
      <Route
        path={OrganizationPath.CONTRACTOR_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Organization/pages/ContractorListPage').default);
          });
        }}
      />
      <Route
        path={`${OrganizationPath.CONTRACTOR_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Organization/pages/ContractorEditPage').default);
          });
        }}
      />

      { /* Address */ }
      <Route
        path={AddressPath.STREET_TYPE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Address/pages/StreetTypeListPage').default);
          });
        }}
      />
      <Route
        path={`${AddressPath.STREET_TYPE_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Address/pages/StreetTypeEditPage').default);
          });
        }}
      />
      <Route
        path={AddressPath.STREET_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Address/pages/StreetListPage').default);
          });
        }}
      />
      <Route
        path={`${AddressPath.STREET_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Address/pages/StreetEditPage').default);
          });
        }}
      />
      <Route
        path={AddressPath.BUILDING_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Address/pages/BuildingListPage').default);
          });
        }}
      />
      <Route
        path={`${AddressPath.BUILDING_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Address/pages/BuildingEditPage').default);
          });
        }}
      />
      <Route
        path={AddressPath.APARTMENT_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Address/pages/ApartmentListPage').default);
          });
        }}
      />
      <Route
        path={`${AddressPath.APARTMENT_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Address/pages/ApartmentEditPage').default);
          });
        }}
      />

      { /* Service */ }
      <Route
        path={ServiceTypePath.SERVICE_TYPE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Services/pages/ServiceTypeListPage').default);
          });
        }}
      />
      <Route
        path={`${ServiceTypePath.SERVICE_TYPE_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Services/pages/ServiceTypeEditPage').default);
          });
        }}
      />
      <Route
        path={ServicePath.SERVICE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Services/pages/ServiceListPage').default);
          });
        }}
      />
      <Route
        path={`${ServicePath.SERVICE_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Services/pages/ServiceEditPage').default);
          });
        }}
      />

      { /* Tariffs */ }
      <Route
        path={TariffPath.TARIFF_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Tariffs/pages/TariffListPage').default);
          });
        }}
      />
      <Route
        path={`${TariffPath.TARIFF_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Tariffs/pages/TariffEditPage').default);
          });
        }}
      />

      { /* Norms */ }
      <Route
        path={NormPath.NORM_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Norms/pages/NormListPage').default);
          });
        }}
      />
      <Route
        path={`${NormPath.NORM_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Norms/pages/NormEditPage').default);
          });
        }}
      />

      { /* Constants */ }
      <Route
        path={CalculationTypePath.CALCULATION_TYPE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/CalculationTypeListPage').default);
          });
        }}
      />
      <Route
        path={`${CalculationTypePath.CALCULATION_TYPE_EDIT}/:id`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/CalculationTypeEditPage').default);
          });
        }}
      />
      <Route
        path={RecalculationTypePath.RECALCULATION_TYPE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/RecalculationTypeListPage').default);
          });
        }}
      />
      <Route
        path={`${RecalculationTypePath.RECALCULATION_TYPE_EDIT}/:id`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/RecalculationTypeEditPage').default);
          });
        }}
      />
      <Route
        path={ParameterTypePath.PARAMETER_TYPE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/ParameterTypeListPage').default);
          });
        }}
      />
      <Route
        path={`${ParameterTypePath.PARAMETER_TYPE_EDIT}/:id`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/ParameterTypeEditPage').default);
          });
        }}
      />
      <Route
        path={GenderTypePath.GENDER_TYPE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/GenderTypeListPage').default);
          });
        }}
      />
      <Route
        path={`${GenderTypePath.GENDER_TYPE_EDIT}/:id`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/GenderTypeEditPage').default);
          });
        }}
      />
      <Route
        path={MeasurementUnitPath.MEASUREMENT_UNIT_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/MeasurementUnitListPage').default);
          });
        }}
      />
      <Route
        path={`${MeasurementUnitPath.MEASUREMENT_UNIT_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/MeasurementUnitEditPage').default);
          });
        }}
      />
      <Route
        path={DocumentTypePath.DOCUMENT_TYPE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/DocumentTypeListPage').default);
          });
        }}
      />
      <Route
        path={`${DocumentTypePath.DOCUMENT_TYPE_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/DocumentTypeEditPage').default);
          });
        }}
      />
      <Route
        path={RegistrationTypePath.REGISTRATION_TYPE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/RegistrationTypeListPage').default);
          });
        }}
      />
      <Route
        path={`${RegistrationTypePath.REGISTRATION_TYPE_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/RegistrationTypeEditPage').default);
          });
        }}
      />
      <Route
        path={MeterTypePath.METER_TYPE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/MeterTypeListPage').default);
          });
        }}
      />
      <Route
        path={`${MeterTypePath.METER_TYPE_EDIT}/:id`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Constants/pages/MeterTypeEditPage').default);
          });
        }}
      />

      { /* Accounts */ }
      <Route
        path={AccountPath.ACCOUNT_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Accounts/pages/AccountListPage').default);
          });
        }}
      />
      <Route
        path={`${AccountPath.ACCOUNT_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Accounts/pages/AccountEditPage').default);
          });
        }}
      />
      <Route
        path={`${AccountPath.ACCOUNT_CARD}/:id`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Accounts/pages/AccountCardPage').default);
          });
        }}
      />

      { /* Citizens */ }
      <Route
        path={CitizenPath.CITIZEN_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Citizens/pages/CitizenListPage').default);
          });
        }}
      />
      <Route
        path={`${CitizenPath.CITIZEN_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Citizens/pages/CitizenEditPage').default);
          });
        }}
      />

      { /* Meters */ }
      <Route
        path={MeterPath.METER_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Meters/pages/MeterListPage').default);
          });
        }}
      />
      <Route
        path={`${MeterPath.METER_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Meters/pages/MeterEditPage').default);
          });
        }}
      />

      { /* Operations */ }
      <Route
        path={CalculationPath.CALCULATION}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Operations/pages/CalculationPage').default);
          });
        }}
      />

      { /* Security */ }
      <Route
        path={UserPath.USER_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Security/pages/UserListPage').default);
          });
        }}
      />
      <Route
        path={`${UserPath.USER_EDIT}(/:id)`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Security/pages/UserEditPage').default);
          });
        }}
      />
      <Route
        path={RolePath.ROLE_LIST}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Security/pages/RoleListPage').default);
          });
        }}
      />
      <Route
        path={`${RolePath.ROLE_EDIT}/:id`}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/Security/pages/RoleEditPage').default);
          });
        }}
      />
    </Route>

    { /* Security */ }
    <Route
      path={LoginPath.LOGIN}
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./modules/Security/pages/LoginFormPage').default);
        });
      }}
    />
  </Route>
);
