/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

import * as AddressPath from './modules/Address/AddressPaths';
import * as OrganizationPath from './modules/Organization/OrganizationPaths';
import * as ServiceTypePath from './modules/Services/paths/ServiceTypePath';
import * as ServicePath from './modules/Services/paths/ServicePath';
import * as TariffPath from './modules/Tariffs/paths/TariffPath';
import * as CalculationTypePath from './modules/Constants/paths/CalculationTypePath';
import * as MeasurementUnitPath from './modules/Constants/paths/MeasurementUnitPath';
import * as DocumentTypePath from './modules/Constants/paths/DocumentTypePath';
import * as RegistrationTypePath from './modules/Constants/paths/RegistrationTypePath';
import * as ParameterTypePath from './modules/Constants/paths/ParameterTypePath';
import * as GenderTypePath from './modules/Constants/paths/GenderTypePath';
import * as AccountPath from './modules/Accounts/paths/AccountPath';
import * as CitizenPath from './modules/Citizens/paths/CitizenPath';
import * as NormPath from './modules/Norms/paths/NormPath';

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  // Address
  require('./modules/App/pages/WelcomePage');
  require('./modules/Address/pages/StreetTypeListPage');
  require('./modules/Address/pages/StreetTypeEditPage');
  require('./modules/Address/pages/StreetListPage');
  require('./modules/Address/pages/StreetEditPage');
  require('./modules/Address/pages/BuildingListPage');
  require('./modules/Address/pages/BuildingEditPage');
  require('./modules/Address/pages/ApartmentListPage');
  require('./modules/Address/pages/ApartmentEditPage');

  // Organization
  require('./modules/Organization/pages/ContractorTypeListPage');
  require('./modules/Organization/pages/ContractorTypeEditPage');
  require('./modules/Organization/pages/ContractorListPage');
  require('./modules/Organization/pages/ContractorEditPage');

  // Services
  require('./modules/Services/pages/ServiceTypeListPage');
  require('./modules/Services/pages/ServiceTypeEditPage');
  require('./modules/Services/pages/ServiceListPage');
  require('./modules/Services/pages/ServiceEditPage');

  // Tariffs
  require('./modules/Tariffs/pages/TariffListPage');
  require('./modules/Tariffs/pages/TariffEditPage');

  // Norms
  require('./modules/Norms/pages/NormListPage');
  require('./modules/Norms/pages/NormEditPage');

  // Constants
  require('./modules/Constants/pages/CalculationTypeListPage');
  require('./modules/Constants/pages/CalculationTypeEditPage');
  require('./modules/Constants/pages/MeasurementUnitListPage');
  require('./modules/Constants/pages/MeasurementUnitEditPage');
  require('./modules/Constants/pages/ParameterTypeListPage');
  require('./modules/Constants/pages/ParameterTypeEditPage');
  require('./modules/Constants/pages/DocumentTypeListPage');
  require('./modules/Constants/pages/DocumentTypeEditPage');
  require('./modules/Constants/pages/GenderTypeListPage');
  require('./modules/Constants/pages/GenderTypeEditPage');
  require('./modules/Constants/pages/RegistrationTypeListPage');
  require('./modules/Constants/pages/RegistrationTypeEditPage');

  // Accounts
  require('./modules/Accounts/pages/AccountListPage');
  require('./modules/Accounts/pages/AccountEditPage');

  // Citizens
  require('./modules/Citizens/pages/CitizenListPage');
  require('./modules/Citizens/pages/CitizenEditPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
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
  </Route>
);
