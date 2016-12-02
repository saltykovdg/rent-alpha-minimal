/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

import * as AddressPath from './modules/Address/AddressPaths';
import * as OrganizationPath from './modules/Organization/OrganizationPaths';
import * as ServiceTypePath from './modules/Service/paths/ServiceTypePath';
import * as ServicePath from './modules/Service/paths/ServicePath';

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

  // Service
  require('./modules/Service/pages/ServiceTypeListPage');
  require('./modules/Service/pages/ServiceTypeEditPage');
  require('./modules/Service/pages/ServiceListPage');
  require('./modules/Service/pages/ServiceEditPage');
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
          cb(null, require('./modules/Service/pages/ServiceTypeListPage').default);
        });
      }}
    />
    <Route
      path={`${ServiceTypePath.SERVICE_TYPE_EDIT}(/:id)`}
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./modules/Service/pages/ServiceTypeEditPage').default);
        });
      }}
    />
    <Route
      path={ServicePath.SERVICE_LIST}
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./modules/Service/pages/ServiceListPage').default);
        });
      }}
    />
    <Route
      path={`${ServicePath.SERVICE_EDIT}(/:id)`}
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./modules/Service/pages/ServiceEditPage').default);
        });
      }}
    />
  </Route>
);
