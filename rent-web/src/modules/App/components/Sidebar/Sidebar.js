import React from 'react';
import { Link, browserHistory } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Menu } from 'antd';

import './Sidebar.less';

import * as AddressPath from '../../../Address/AddressPaths';
import * as OrganizationPath from '../../../Organization/OrganizationPaths';
import * as ServiceTypePath from '../../../Services/paths/ServiceTypePath';
import * as ServicePath from '../../../Services/paths/ServicePath';
import * as TariffPath from '../../../Tariffs/paths/TariffPath';
import * as CalculationTypePath from '../../../Constants/paths/CalculationTypePath';
import * as MeasurementUnitPath from '../../../Constants/paths/MeasurementUnitPath';
import * as ParameterTypePath from '../../../Constants/paths/ParameterTypePath';
import * as GenderTypePath from '../../../Constants/paths/GenderTypePath';
import * as DocumentTypePath from '../../../Constants/paths/DocumentTypePath';
import * as RegistrationTypePath from '../../../Constants/paths/RegistrationTypePath';
import * as RecalculationTypePath from '../../../Constants/paths/RecalculationTypePath';
import * as MeterTypePath from '../../../Constants/paths/MeterTypePath';
import * as AccountPath from '../../../Accounts/paths/AccountPath';
import * as CitizenPath from '../../../Citizens/paths/CitizenPath';
import * as NormPath from '../../../Norms/paths/NormPath';
import * as MeterPath from '../../../Meters/paths/MeterPath';
import * as CalculationPath from '../../../Operations/paths/CalculationPath';
import * as UserPath from '../../../Security/paths/UserPath';
import * as RolePath from '../../../Security/paths/RolePath';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

function Sidebar() {
  const location = browserHistory.getCurrentLocation().pathname;
  let defaultOpenKey = '';

  if (location.indexOf('/address/') !== -1) {
    defaultOpenKey = 'sidebarAddress';
  } else if (location.indexOf('/organization/') !== -1) {
    defaultOpenKey = 'sidebarOrganizations';
  } else if (location.indexOf('/services/') !== -1) {
    defaultOpenKey = 'sidebarServices';
  } else if (location.indexOf('/constants/') !== -1) {
    defaultOpenKey = 'sidebarConstants';
  } else if (location.indexOf('/operations/') !== -1) {
    defaultOpenKey = 'sidebarOperations';
  } else if (location.indexOf('/security/') !== -1) {
    defaultOpenKey = 'sidebarSecurity';
  }

  return (
    <div className="sidebar">
      <Menu
        mode="inline"
        defaultOpenKeys={[defaultOpenKey]}
        selectedKeys={[location]}
      >
        <Item key={AccountPath.ACCOUNT_LIST}>
          <Link to={AccountPath.ACCOUNT_LIST}>
            <FormattedMessage id="accountsTitle" />
          </Link>
        </Item>
        <Item key={CitizenPath.CITIZEN_LIST}>
          <Link to={CitizenPath.CITIZEN_LIST}>
            <FormattedMessage id="citizensTitle" />
          </Link>
        </Item>
        <Item key={MeterPath.METER_LIST}>
          <Link to={MeterPath.METER_LIST}>
            <FormattedMessage id="metersTitle" />
          </Link>
        </Item>
        <SubMenu key="sidebarOrganizations" title={<FormattedMessage id="organizationTitle" />}>
          <Item key={OrganizationPath.CONTRACTOR_TYPE_LIST}>
            <Link to={OrganizationPath.CONTRACTOR_TYPE_LIST}>
              <FormattedMessage id="contractorTypeTitle" />
            </Link>
          </Item>
          <Item key={OrganizationPath.CONTRACTOR_LIST}>
            <Link to={OrganizationPath.CONTRACTOR_LIST}>
              <FormattedMessage id="contractorTitle" />
            </Link>
          </Item>
        </SubMenu>
        <SubMenu key="sidebarAddress" title={<FormattedMessage id="addressTitle" />}>
          <Item key={AddressPath.STREET_TYPE_LIST}>
            <Link to={AddressPath.STREET_TYPE_LIST}>
              <FormattedMessage id="streetTypeTitle" />
            </Link>
          </Item>
          <Item key={AddressPath.STREET_LIST}>
            <Link to={AddressPath.STREET_LIST}>
              <FormattedMessage id="streetTitle" />
            </Link>
          </Item>
          <Item key={AddressPath.BUILDING_LIST}>
            <Link to={AddressPath.BUILDING_LIST}>
              <FormattedMessage id="buildingTitle" />
            </Link>
          </Item>
          <Item key={AddressPath.APARTMENT_LIST}>
            <Link to={AddressPath.APARTMENT_LIST}>
              <FormattedMessage id="apartmentTitle" />
            </Link>
          </Item>
        </SubMenu>
        <SubMenu key="sidebarServices" title={<FormattedMessage id="servicesTitle" />}>
          <Item key={ServiceTypePath.SERVICE_TYPE_LIST}>
            <Link to={ServiceTypePath.SERVICE_TYPE_LIST}>
              <FormattedMessage id="serviceTypeTitle" />
            </Link>
          </Item>
          <Item key={ServicePath.SERVICE_LIST}>
            <Link to={ServicePath.SERVICE_LIST}>
              <FormattedMessage id="servicesTitle" />
            </Link>
          </Item>
        </SubMenu>
        <Item key={TariffPath.TARIFF_LIST}>
          <Link to={TariffPath.TARIFF_LIST}>
            <FormattedMessage id="tariffsTitle" />
          </Link>
        </Item>
        <Item key={NormPath.NORM_LIST}>
          <Link to={NormPath.NORM_LIST}>
            <FormattedMessage id="normsTitle" />
          </Link>
        </Item>
        <SubMenu key="sidebarConstants" title={<FormattedMessage id="constantsTitle" />}>
          <Item key={CalculationTypePath.CALCULATION_TYPE_LIST}>
            <Link to={CalculationTypePath.CALCULATION_TYPE_LIST}>
              <FormattedMessage id="calculationTypeTitle" />
            </Link>
          </Item>
          <Item key={RecalculationTypePath.RECALCULATION_TYPE_LIST}>
            <Link to={RecalculationTypePath.RECALCULATION_TYPE_LIST}>
              <FormattedMessage id="recalculationTypeTitle" />
            </Link>
          </Item>
          <Item key={ParameterTypePath.PARAMETER_TYPE_LIST}>
            <Link to={ParameterTypePath.PARAMETER_TYPE_LIST}>
              <FormattedMessage id="parameterTypeTitle" />
            </Link>
          </Item>
          <Item key={MeterTypePath.METER_TYPE_LIST}>
            <Link to={MeterTypePath.METER_TYPE_LIST}>
              <FormattedMessage id="meterTypeTitle" />
            </Link>
          </Item>
          <Item key={GenderTypePath.GENDER_TYPE_LIST}>
            <Link to={GenderTypePath.GENDER_TYPE_LIST}>
              <FormattedMessage id="genderTypeTitle" />
            </Link>
          </Item>
          <Item key={MeasurementUnitPath.MEASUREMENT_UNIT_LIST}>
            <Link to={MeasurementUnitPath.MEASUREMENT_UNIT_LIST}>
              <FormattedMessage id="measurementUnitTitle" />
            </Link>
          </Item>
          <Item key={DocumentTypePath.DOCUMENT_TYPE_LIST}>
            <Link to={DocumentTypePath.DOCUMENT_TYPE_LIST}>
              <FormattedMessage id="documentTypeTitle" />
            </Link>
          </Item>
          <Item key={RegistrationTypePath.REGISTRATION_TYPE_LIST}>
            <Link to={RegistrationTypePath.REGISTRATION_TYPE_LIST}>
              <FormattedMessage id="registrationTypeTitle" />
            </Link>
          </Item>
        </SubMenu>
        <SubMenu key="sidebarOperations" title={<FormattedMessage id="operationsTitle" />}>
          <Item key={CalculationPath.CALCULATION}>
            <Link to={CalculationPath.CALCULATION}>
              <FormattedMessage id="calculationTitle" />
            </Link>
          </Item>
        </SubMenu>
        <SubMenu key="sidebarSecurity" title={<FormattedMessage id="securityTitle" />}>
          <Item key={RolePath.ROLE_LIST}>
            <Link to={RolePath.ROLE_LIST}>
              <FormattedMessage id="rolesTitle" />
            </Link>
          </Item>
          <Item key={UserPath.USER_LIST}>
            <Link to={UserPath.USER_LIST}>
              <FormattedMessage id="usersTitle" />
            </Link>
          </Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default injectIntl(Sidebar);
