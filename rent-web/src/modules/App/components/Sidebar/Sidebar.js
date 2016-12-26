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
import * as AccountPath from '../../../Accounts/paths/AccountPath';

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
        <SubMenu key="sidebarNorms" title={<FormattedMessage id="normsTitle" />}>
          <Item key="sidebarNormsGroupsNorms">
            <Link to="/norms/group/list">
              <FormattedMessage id="normsGroupsNormsTitle" />
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
        <SubMenu key="sidebarConstants" title={<FormattedMessage id="constantsTitle" />}>
          <Item key={CalculationTypePath.CALCULATION_TYPE_LIST}>
            <Link to={CalculationTypePath.CALCULATION_TYPE_LIST}>
              <FormattedMessage id="calculationTypeTitle" />
            </Link>
          </Item>
          <Item key={ParameterTypePath.PARAMETER_TYPE_LIST}>
            <Link to={ParameterTypePath.PARAMETER_TYPE_LIST}>
              <FormattedMessage id="parameterTypeTitle" />
            </Link>
          </Item>
          <Item key={MeasurementUnitPath.MEASUREMENT_UNIT_LIST}>
            <Link to={MeasurementUnitPath.MEASUREMENT_UNIT_LIST}>
              <FormattedMessage id="measurementUnitTitle" />
            </Link>
          </Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default injectIntl(Sidebar);
